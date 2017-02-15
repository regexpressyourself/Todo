import React from 'react';
import axios from 'axios';

class NewIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            projectList        : [],
            projectSelectBoxes : [],
            projectId          : ""
        }
        this.createProjectBoxes = this.createProjectBoxes.bind(this);
        this.getProjects        = this.getProjects.bind(this);
        this.selectProject      = this.selectProject.bind(this);
    }

    getProjects() {
        axios.get('/api/projects')
             .then((response) => {
                 this.createProjectBoxes(response);
             })
             .catch((error) => {
                 console.log(error);
             });
    }

    createProjectBoxes(response) {
        let projectSelectBoxes = [];
        let projectList        = response.data;

        for (let i = 0; i < projectList.length; i++) {
            let projectName = projectList[i].name;
            let projectId   = projectList[i].id;
            let gridNumber  = Math.floor(12 / projectList.length);

            projectSelectBoxes.push(this.createProjectSelectBox(i, 
                                                                projectId,
                                                                projectName));
        }
        this.setState({projectSelectBoxes: projectSelectBoxes});
    }

    createProjectSelectBox(i, projectId, projectName) {
        return (
            <div key={i}
                 onClick={() => this.selectProject(projectId)}>
                <div>
                    <h4>{projectName}</h4>
                </div>
            </div>
        )
    }

    selectProject(projectId) {
        this.setState({
            projectId: projectId
        });
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div>
            <h2>New Issue Form</h2>
                <form method="post"
                      action="/api/new-issue">
                    <div>
                        {this.state.projectSelectBoxes}
                    </div>
                    <input name="issue-project-id"
                           type="hidden"
                           value={this.state.projectId}/>
                    <br/>
                    <div>
                        <input type="text"
                               name="issue-name"
                               id="issue-name" />
                        <label htmlFor="issue-name">
                            Issue Name
                        </label>
                    </div>
                    <br/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default NewIssue;
