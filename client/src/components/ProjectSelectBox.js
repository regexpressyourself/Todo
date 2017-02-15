import React from 'react';
import { Link } from 'react-router';


class ProjectSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            newProject: false,
            stageList: [],
            isModalOpen: false
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.projectId,
            name: this.props.projectName,
            stageList: this.props.stageList,
            isNewProject: this.props.newProject || false
        });
    }

    render() {
        return (
            <Link to={"/projects/views/kanban/" + this.state.id}>
                <div className="project-select-box">
                    <h4>{this.state.name}</h4>
                </div>
            </Link>
        )
    }
}

export default ProjectSelectBox;
