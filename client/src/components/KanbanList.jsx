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
        console.log("one");
        axios.get('/api/issues', {
            params: {
                stageId: stageId
            }
        })
             .then((response) => {
                 this.setState({issueList: response.data});
             }).catch((error) => {
                 console.log(error);
             });
    }

    render() {
        console.log(this.state.issueList);
        return (
            <div className="kanban-issue-list">
                hello
            </div>
        )
    }
}

export default KanbanList;
