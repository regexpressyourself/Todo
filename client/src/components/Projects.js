import React from 'react';
import {Container, Col4, Row} from './Bootstrap';
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
        axios.get('/api/projects', {
            params: {
                userId: 1
            }
        })
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
            let stageList   = projectList[i].stageList;

            projectSelectBoxes.push(this.createProjectSelectBox(projectId,
                                                                projectName,
                                                                stageList));
        }
        this.setState({projectSelectBoxes: projectSelectBoxes});
    }

    createProjectSelectBox(projectId, projectName, stageList) {
        return (
            <div className="col-ph-12 col-xs-6 col-sm-4" key={projectId}>
                <ProjectSelectBox projectId={projectId}
                                  projectName={projectName}
                                  stageList={stageList} >
                </ProjectSelectBox>
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
            <Container>
                <Row>
                    <h1>
                        Your Projects
                    </h1>
                </Row>
                <Row>
                    {this.state.projectSelectBoxes}
                </Row>
            </Container>
        )
    }
}
export default Projects;
