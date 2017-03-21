import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import KanbanEditStageButton from './KanbanEditStageButton';
import KanbanIssue from './KanbanIssue';
import KanbanList from './KanbanList';

var flow = require('lodash.flow');

const stageSource = {
    beginDrag(props) {
        return {
            stageId: props.stageId,
            order: props.order
        };
    },
};

const stageTarget = {
    drop(props, monitor, component) {

        const dragIndex = monitor.getItem().order;
        const hoverIndex = props.order;
        if (dragIndex === hoverIndex) {
            return;
        }

        props.moveStage(dragIndex, hoverIndex);

    },
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().order;
        const hoverIndex = props.order;
        if (dragIndex === hoverIndex) {
            return;
        }
    }
};

class KanbanListWrapper extends React.Component {
    render() {
        const { isOver, isDragging, connectDragSource, connectDropTarget } = this.props;

        /* Add hover class if the stage is being dragged and dropped*/
        let headerClass = (isOver && !isDragging) ?
                          "kanban-header stage-hover" :
                          "kanban-header";

        return connectDragSource(connectDropTarget(
            <div className="kanban-list-wrapper">
                <div className="kanban-list">
                    <div className={headerClass}>
                        {this.props.stageTitle}
                        <KanbanEditStageButton stageTitle={this.props.stageTitle}
                                               stageId={this.props.stageId} />
                    </div>
                    <KanbanList stageTitle={this.props.stageTitle}
                                stageId={this.props.stageId} />
                </div>
            </div>
        ));
    }
}

module.exports = flow(
    DropTarget('stage', stageTarget, (connect, monitor) => ({
        isOver: monitor.isOver() && monitor.canDrop(),
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource('stage', stageSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))
)(KanbanListWrapper);
