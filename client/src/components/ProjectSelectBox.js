import React from 'react';
import Modal from 'react-modal';
import EditProject from './EditProject';

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
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
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
            <div>
                <div onClick={() => this.handleOpenModal()}
                     className="project-select-box">
                    <h4>{this.state.name}</h4>
                </div>

                <Modal isOpen={this.state.showModal}
                       contentLabel="{this.state.name} modal"
                       onRequestClose={this.handleCloseModal}>
                    <EditProject projectName={this.state.name}
                                 projectId={this.state.id}
                                 stageList={this.state.stageList}/>
                </Modal>
            </div>
        )
    }
}

export default ProjectSelectBox;
