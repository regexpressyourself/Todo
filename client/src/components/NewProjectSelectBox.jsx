import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Container} from './Bootstrap';
import Modal from 'react-modal';
import axios from 'axios';


class ProjectSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            stageList: [],
            stageListAsText: [],
            currentStage: "",
            projectName: ""
        };

        this.openModal         = this.openModal.bind(this);
        this.afterOpenModal    = this.afterOpenModal.bind(this);
        this.closeModal        = this.closeModal.bind(this);
        this.addStageToList    = this.addStageToList.bind(this);
        this.handleAddStage = this.handleAddStage.bind(this);
        this.handleProjectName = this.handleProjectName.bind(this);
        this.handleStageName = this.handleStageName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            stageList: [],
            stageListAsText: [],
            currentStage: ""

        });
    }

    createNewProject() {
    }

    addStageToList() {
        let stageList = this.state.stageList;
        let stageListAsText = this.state.stageListAsText;

        stageListAsText.push(this.state.currentStage);

        let newStage = (
            <div key={stageList.length} className="form-stage-list-item">
                {this.state.currentStage}
            </div>
        );
        stageList.push(newStage);

        this.setState({
            stageList: stageList,
            stageListAsText: stageListAsText,
            currentStage: ""
        });
    }

    handleAddStage(e) {
        if ( e.key === "Enter") {
            e.preventDefault();
            this.addStageToList();
        }
    }

    handleStageName(e) {
        this.setState({
            currentStage: e.target.value
        })
    }

    handleProjectName(e) {
            this.setState({
                projectName: e.target.value
            })
    }

    handleFormSubmit() {
        console.log(this.state);
        if (this.state.projectName.length === 0) {

        }
        else {
            let projectName = this.state.projectName;
            let stageListAsText = this.state.stageListAsText;
            axios.post('/api/new-project', {
                projectName: projectName,
                stageList: stageListAsText})
                 .then((response) => {
                     console.log(response);
                 }).catch((error) => {
                     console.log(error);
                 });
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

            <form className="form-horizontal">
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
                               value={this.state.projectName}
                               onChange={this.handleProjectName}
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
                               type="text"
                               name="project-name"
                               id="project-name"
                               value={this.state.currentStage}
                               ref={(input) => {this.stageInput = input;}}
                               onChange={this.handleStageName}
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
                <button className="btn btn-default" onClick={this.handleFormSubmit} >
                    Submit
                </button>
            </form>
                </Modal>
            </div>
        )
    }
}

export default ProjectSelectBox;
