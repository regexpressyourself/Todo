import React from 'react';
import KanbanListWrapper from './KanbanListWrapper';
import KanbanAddNewStage from './KanbanAddNewStage';
class KanbanWrapper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stageList: []
        };
    this.moveStage = this.moveStage.bind(this);

    }

    componentDidMount() {
        this.setState({
            stageList: this.makeStageColumns(this.props.stageList)
        });
    }

    moveStage(dragIndex, hoverIndex) {
        let  stageList  = this.state.stageList;
        let dragStage = stageList[dragIndex];
        let hoverStage = stageList[hoverIndex];
        if (dragStage && hoverStage) {
            stageList[dragIndex] = (
                <KanbanListWrapper key={hoverStage.props.stageId}
                                   stageId={hoverStage.props.stageId}
                                   stageTitle={hoverStage.props.stageTitle}
                                   order={dragStage.props.order}
                                   moveStage={this.moveStage}/>
            );

            stageList[hoverIndex] =  (
                <KanbanListWrapper key={dragStage.props.stageId}
                                   stageId={dragStage.props.stageId}
                                   stageTitle={dragStage.props.stageTitle}
                                   order={hoverStage.props.order}
                                   moveStage={this.moveStage}/>
            );

            this.setState({
                stageList: stageList
            });

        }
    }

    makeStageColumns(stageList) {
        let orderedStageList = [];
        let i = 0;
        for (let stage of stageList) {
            orderedStageList[stage.order] = (
                <KanbanListWrapper key={stage.id}
                                   stageId={stage.id}
                                   stageIndex={i++}
                                   stageTitle={stage.name}
                                   order={stage.order}
                                   moveStage={this.moveStage}>
                </KanbanListWrapper>
            )
        }
        orderedStageList.push(<KanbanAddNewStage order={stageList.length+1}
                                                 key={stageList.length+1}
                                                 parentProject={this.props.projectId}/>);
        return orderedStageList;

    }

    render() {
        return (
            <div className="kanban-board-canvas">
                <div className="kanban-board">
                    {this.state.stageList}
                </div>
            </div>
        )
    }
}

export default KanbanWrapper;
