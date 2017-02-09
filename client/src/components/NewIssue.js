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
        axios.get('/projects')
             .then((response) => {
                 console.log(response);
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
            let gridClass   = "mdl-cell mdl-cell--" +
                              gridNumber +
                              "-col mdl-card mdl-shadow--2dp";

            projectSelectBoxes.push(this.createProjectSelectBox(i,
                                                                gridClass,
                                                                projectId,
                                                                projectName));
        }
        this.setState({projectSelectBoxes: projectSelectBoxes});
    }

    createProjectSelectBox(i, gridClass, projectId, projectName) {
        return (
            <div key={i}
                 className={gridClass}
                 onClick={() => this.selectProject(projectId)}>
                <div className="mdl-card__title mdl-card--expand">
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
                      action="/new-issue">
                    <div className="mdl-grid">
                        {this.state.projectSelectBoxes}
                    </div>
                    <input name="issue-project-id"
                           type="hidden"
                           value={this.state.projectId}/>
                    <br/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input"
                               type="text"
                               name="issue-name"
                               id="issue-name" />
                        <label className="mdl-textfield__label"
                               htmlFor="issue-name">
                            Issue Name
                        </label>
                    </div>
                    <br/>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
                            type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default NewIssue;
