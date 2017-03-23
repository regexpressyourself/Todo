import React from 'react';
import axios from 'axios';

class KanbanList extends React.Component {
    /* Acts as the list of issues for a particular stage*/
    constructor(props) {
        super(props);
        this.state ={
            stageId: '',
            issueList: []
        };
    }

    componentDidMount() {
        this.setState({
            stageId: this.props.stageId
        }, this.getIssuesByStageId(this.props.stageId));
    }

    getIssuesByStageId(stageId) {
        axios.get('/api/issues', {
            params: {
                stageId: stageId
            }
        })
             .then((response) => {
                 this.createIssueComponents(response.data);
             }).catch((error) => {
                 console.log(error);
             });
    }

    createIssueComponents(issueList) {
        // make a list of components for each issue
        let issueComponents = issueList.map((issue) => {
            return (
                <KanbanIssue key={issue.id}
                             name={issue.name}
                             description={issue.description}
                             dueDate={issue.dueDate}
                             endTime={issue.endTime}
                             id={issue.id}
                             priority={issue.priority}
                             stageId={issue.stageId}
                             startTime={issue.startTime} >
                </KanbanIssue>
            )
        });

        // allow for "add new card" at bottom of list
        issueComponents.push(<KanbanAddNewIssue stageId={this.props.stageId}
                                                key={-1}/>);

        this.setState({
            issueList: issueList,
            issueComponents: issueComponents
        });
    }

    render() {
        return (
            <div className="kanban-issue-list">
                {this.state.issueComponents}
            </div>
        )
    }
}

export default KanbanList;
