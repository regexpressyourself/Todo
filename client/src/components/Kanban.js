import React from 'react';
import {Container} from './Bootstrap';
import KanbanWrapper from './KanbanWrapper';
import KanbanListWrapper from './KanbanListWrapper';

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
            console.log(response);
            this.setState({
                projectName:     response.name,
                stageList:       response.stageList,
                stageComponents: this.makeStageColumns(response.stageList)
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    makeStageColumns(stageList) {
        let orderedStageList = [];
        for (let stage of stageList) {
            orderedStageList[stage.order] = (
                <KanbanListWrapper key={stage.id} title={stage.name}>
                </KanbanListWrapper>
            )
        }
        return orderedStageList;
    }

    render() {
        return (
            <KanbanWrapper title={this.state.projectName}>
                {this.state.stageComponents}
            </KanbanWrapper>
        )
    }
}
export default Kanban;
