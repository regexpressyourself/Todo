import React from 'react';
import Modal from 'react-modal';

class KanbanEditStageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal         = this.openModal.bind(this);
        this.closeModal        = this.closeModal.bind(this);
    }

    componentDidMount(){
        this.setState({
            stageTitle: this.props.stageTitle,
            stageId: this.props.stageId
        });
    }

    openModal() {this.setState({modalIsOpen: true});}
    closeModal() {this.setState({modalIsOpen: false});}

    handleStageTitleChange(event) {
        this.setState({ stageTitle: event.target.value });
    }

    render() {
        return (
            <span>
            <button onClick={this.openModal} className="btn btn-warning kanban-edit-stage-title-btn">
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
                <Modal isOpen={this.state.modalIsOpen}
                       onAfterOpen={this.afterOpenModal}
                       onRequestClose={this.closeModal}
                       contentLabel="Edit Stage" >

                    <h2>Edit Stage</h2>

                    <form method="post"
                          action="/api/edit-stage"
                          className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-4">
                                <label htmlFor="stage-name">
                                    Stage Name
                                </label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="text"
                                       name="stage-name"
                                       value={this.props.stageTitle}
                                       onChange={this.handleStageTitleChange}
                                       id="stage-name" />
                            </div>
                        </div>

                        <input className="form-control"
                               type="hidden"
                               name="stage-id"
                               id="stage-id"
                               value={this.props.stageId} />
                        <br/>
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </form>
                </Modal>
            </span>

        )
    }
}
export default KanbanEditStageButton;
