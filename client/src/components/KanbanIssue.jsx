import React from 'react';

class KanbanIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:        "",
            description: "",
            dueDate:     "",
            endTime:     "",
            id:          "",
            priority:    "",
            stageId:     "",
            startTime:   ""
        }
    }
    componentDidMount() {
        this.setState({
            name:        this.props.name,
            description: this.props.description,
            dueDate:     this.props.dueDate,
            endTime:     this.props.endTime,
            id:          this.props.id,
            priority:    this.props.priority,
            stageId:     this.props.stageId,
            startTime:   this.props.startTime
        });
    }
    render() {
        return (
            <div className="kanban-issue">
                {this.state.name}
            </div>
        )
    }
}

export default KanbanIssue;
