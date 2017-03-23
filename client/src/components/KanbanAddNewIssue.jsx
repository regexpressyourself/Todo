import React from 'react';
import Modal from 'react-modal';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class KanbanAddNewIssue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            currentStage: ""
        };
        this.openModal         = this.openModal.bind(this);
        this.closeModal        = this.closeModal.bind(this);
    }

    openModal() {this.setState({modalIsOpen: true});}
    closeModal() {this.setState({modalIsOpen: false});}

    render() {
        return (
            <div>
                <div onClick={this.openModal} className="kanban-add-issue">
                    Add Issue!!
                </div>

                <Modal isOpen={this.state.modalIsOpen}
                       onAfterOpen={this.afterOpenModal}
                       onRequestClose={this.closeModal}
                       contentLabel="Add Issue" >

                    <h2>Add Issue</h2>

                    <form method="post"
                          action="/api/new-issue"
                          className="form-horizontal">

                        <div className="form-group">
                            <div className="col-sm-4">
                                <label htmlFor="name">
                                    Issue Name
                                </label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="text"
                                       name="name"
                                       id="name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-4">
                                <label htmlFor="description">
                                    Issue Description
                                </label>
                            </div>
                            <div className="col-sm-8">
                                <textarea cols="30"
                                          id="description"
                                          name="description"
                                          className="form-control"
                                          rows="5">
                                </textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-4">
                                <label>
                                    Due Date
                                </label>
                            </div>
                            <div className="col-sm-8">
                                <SingleDatePicker
                                    date={this.state.date}
                                    onDateChange={date => this.setState({ date })}
                                    focused={this.state.focused}
                                    onFocusChange={({ focused }) => this.setState({ focused })} />
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
            </div>
        )
    }
}

export default KanbanAddNewIssue;
