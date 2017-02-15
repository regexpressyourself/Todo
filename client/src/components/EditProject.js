import React from 'react';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stageNames: []
        }
    }

    componentDidMount() {
        this.setState({
            stageNames: this.getStageNames()
        });
    }

    getStageNames() {
        return this.props.stageList.map((stage) => {
            return stage.name;
        });

    }

    render() {
        return (
            <div>
                <h3>{this.props.projectName}</h3>
                <form method="post"
                      action="/api/edit-project">
                        <label htmlFor="project-name">
                            Project Name
                        </label>
                        <input required
                               className="form-control"
                               placeholder="Project Name"
                               type="text"
                               name="project-name"
                               id="project-name" />
                    <br/>
                    <button type="submit"
                            className="btn btn-default">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default EditProject;
