import React from 'react';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Edit Project Form</h2>
                <form method="post"
                      action="/api/edit-project">
                    <div>
                        <input required
                               type="text"
                               name="project-name"
                               id="project-name" />
                        <label
                               htmlFor="project-name">
                            Project Name
                        </label>
                    </div>
                    <br/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default EditProject;
