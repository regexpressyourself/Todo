import React from 'react';
import Modal from 'react-modal';

class ProjectSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            newProject: false,
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
                           contentLabel="onRequestClose Example"
                           onRequestClose={this.handleCloseModal} >
                        <p>Modal text!</p>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </Modal>
            </div>
        )
    }
}

export default ProjectSelectBox;
