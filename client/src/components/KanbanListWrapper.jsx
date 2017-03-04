import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

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
        let header = "";
        if (isOver && !isDragging) {
            header = (
                    <div className="kanban-header stage-hover">
                        {this.props.stageTitle}
                    </div>
            )
        }
        else {
            header = (
                    <div className="kanban-header">
                        {this.props.stageTitle}
                    </div>
            )
        }

        return connectDragSource(connectDropTarget(
            <div className="kanban-list-wrapper">
                <div className="kanban-list">
                    {header}
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
