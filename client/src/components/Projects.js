import React from 'react';
import {Container, Col4} from './Bootstrap';
import ProjectSelectBox from './ProjectSelectBox';
import axios from 'axios';

class Projects extends React.Component {
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

        projectList.unshift({
            name:"New",
            id: -1
        });

        for (let i = 0; i < projectList.length; i++) {
            let projectName = projectList[i].name;
            let projectId   = projectList[i].id;

            projectSelectBoxes.push(this.createProjectSelectBox(projectId,
                                                                projectName));
        }
        this.setState({projectSelectBoxes: projectSelectBoxes});
    }

    createProjectSelectBox(projectId, projectName) {
        return (
            <Col4 key={projectId}>
                <ProjectSelectBox projectId={projectId}
                                  projectName={projectName}>
                </ProjectSelectBox>
            </Col4>
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
            <Container>
                <h1>
                    Your Projects
                </h1>
                    <div>
                        {this.state.projectSelectBoxes}
                    </div>
            </Container>
        )
    }
}
export default Projects;
