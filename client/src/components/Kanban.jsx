import React from 'react';
import KanbanWrapper from './KanbanWrapper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import axios from 'axios';


class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId:  '',
            projectName: '',
            stageList: []
        };
        this.getProjects = this.getProjects.bind(this);
    }

    componentDidMount() {
        this.setState({
            projectId: this.props.params.projectId
        }, this.getProjects());
    }

    getProjects() {
        axios.get('/api/project', {
            params: {
                projectId: this.props.params.projectId
            }
        }).then((response) => {
            response = response.data;
            this.setState({
                projectName:     response.name,
                kanbanWrapper: (
                    <KanbanWrapper stageList={response.stageList}
                                   projectId={this.props.params.projectId} />
                )
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="app-inner">
                    <div className="kanban-board-wrapper">
                        <div className="kanban-board-inner">
                            <div className="kanban-board-header">
                                <h1>
                                    {this.state.projectName}
                                </h1>
                            </div>
                            {this.state.kanbanWrapper}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DragDropContext(HTML5Backend)(Kanban);
