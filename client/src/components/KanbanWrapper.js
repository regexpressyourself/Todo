import React from 'react';
function KanbanWrapper(props) {
    return (
        /* Thats'a lotta jsx!*/
        <div className="app-wrapper">
            <div className="app-inner">
                <div className="kanban-board-wrapper">
                    <div className="kanban-board-inner">
                        <div className="kanban-board-header">
                            <h1>
                                {props.title}
                            </h1>
                        </div>
                        <div className="kanban-board-canvas">
                            <div className="kanban-board">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KanbanWrapper;
