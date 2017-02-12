import React from 'react';

class NewProject extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>New Project Form</h2>
                    <form method="post"
                          action="/api/new-project">
                        <div>
                            <label htmlFor="project-name">
                                Project Name
                            </label>
                            <input className="form-control"
                                   required
                                   type="text"
                                   name="project-name"
                                   id="project-name" />
                        </div>
                        <br/>
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default NewProject;
