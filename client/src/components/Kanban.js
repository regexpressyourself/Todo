import React from 'react';
import {Container} from './Bootstrap';
import axios from 'axios';

class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId:  '',
            projectName: '',
            stageList: []
        };
        this.getProjects        = this.getProjects.bind(this);
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
                stageList:       response.stageList,
                stageComponents: this.makeStageColumns(response.stageList)
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    makeStageColumns(stageList) {
        return (
            stageList.map(function(stage) {
                return (
                    <div key={stage.id}>
                        <h2>{ stage.name }</h2>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <Container>
                <h1>{this.state.projectName}</h1>
                {this.state.stageComponents}
            </Container>
        )
    }
}
export default Kanban;
