import React from 'react';

class KanbanListWrapper extends React.Component {
    render() {
    return (
        <div className="kanban-list-wrapper">
            <div className="kanban-list">
                <div className="kanban-header">
                    {this.props.title}
                </div>
            </div>
        </div>
    )
    }
}

export default KanbanListWrapper;
