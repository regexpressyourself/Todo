import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Container} from './Bootstrap';
import Modal from 'react-modal';


class ProjectSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            stageList: [],
            currentStage: ""
        };

        this.openModal         = this.openModal.bind(this);
        this.afterOpenModal    = this.afterOpenModal.bind(this);
        this.closeModal        = this.closeModal.bind(this);
        this.addStageToList    = this.addStageToList.bind(this);
        this.handleAddStage = this.handleAddStage.bind(this);
        this.handleStageKeypress = this.handleStageKeypress.bind(this);
    }

    /*
       componentDidMount() {
       console.log(this.refs.stageInput);
       const stageInput = ReactDOM.findDOMNode(this.refs.stageInput);
       const stageEvent = stageInput.addEventListener || stageInput.attachEvent;
       stageEvent("keypress", this.handleStageKeypress, false);
       }

       componentWillUnmount() {
       const stageInput = ReactDOM.findDOMNode(this.refs.stageInput);
       const removeEvent = stageInput.removeEventListener || stageInput.detachEvent;
       removeEvent("keypress", this.handleStageKeypress);
       }
     */

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            stageList: [],
            currentStage: ""

        });
    }

    createNewProject() {
    }

    addStageToList() {
        let stageList = this.state.stageList;

        let newStage = (
            <div className="form-stage-list-item">
                {this.state.currentStage}
            </div>
        );
        stageList.push(newStage);

        this.setState({
            stageList: stageList,
            currentStage: ""
        });
    }

    handleAddStage(e) {
        e.preventDefault();
        if (e.key === "Enter"){
            console.log(e.target.value);
            e.target.value = "";
            this.addStageToList();
        }
        else {
            e.target.value += e.key;
            this.setState({
                currentStage: e.target.value
            })
        }
    }

    handleStageKeypress(e){
        if (e.keyCode === 13) {
            console.log(e);
        }
    }


    render() {
        return (
            <div className="col-ph-12 col-xs-6 col-sm-4">
            <div onClick={this.openModal} className="new-project-select-box">
            <h4>New</h4>
            </div>
            <Modal isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal" >

            <h2>New Project</h2>

            <form method="post"
                  action="/api/new-project"
                  className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-4">
                        <label htmlFor="project-name">
                            Project Name
                        </label>
                    </div>
                    <div className="col-sm-8">
                        <input className="form-control"
                               type="text"
                               name="project-name"
                               id="project-name" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-4">
                        <div className="running-stage-list">

                            {this.state.stageList}

                        </div>

                    </div>

                </div>
                <div className="form-group">
                    <div className="col-sm-4">

                        <label htmlFor="stage-name">
                            Add Stages
                        </label>
                    </div>
                    <div className="col-sm-6">
                        <input className="form-control"
                               required
                               type="text"
                               name="project-name"
                               id="project-name"
                               value={this.state.currentStage}
                               ref={(input) => {this.stageInput = input;}}
                               onKeyPress={this.handleAddStage} />
                    </div>
                    <div className="col-sm-2">
                        <div onClick={this.addStageToList}
                             className="btn btn-default">
                            Add Stage
                        </div>
                    </div>
                </div>
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

export default ProjectSelectBox;
