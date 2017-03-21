import React from 'react';
import Modal from 'react-modal';

class KanbanAddNewStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            stageList: [],
            currentStage: ""
        };

        this.openModal         = this.openModal.bind(this);
        this.closeModal        = this.closeModal.bind(this);
    }
    openModal() {this.setState({modalIsOpen: true});}
    closeModal() {this.setState({modalIsOpen: false});}
    render() {
        return (
            <div className="kanban-list-wrapper">
                <div className="kanban-list">
                    <div onClick={this.openModal}
                         className="add-new-stage-kanban-header">
                        Add New Stage
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen}
                       onAfterOpen={this.afterOpenModal}
                       onRequestClose={this.closeModal}
                       contentLabel="Add Stage" >

                    <h2>Add Stage</h2>

                    <form method="post"
                          action="/api/new-stage"
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
                                       id="stage-name" />
                            </div>
                        </div>

                        <input className="form-control"
                               type="hidden"
                               name="stage-order"
                               id="stage-order"
                               value={this.props.order} />
                        <input className="form-control"
                               type="hidden"
                               name="parent-project"
                               id="parent-project"
                               value={this.props.parentProject} />
                        <br/>
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </form>
                </Modal>
            </div>

        )
    }
}
export default KanbanAddNewStage;
