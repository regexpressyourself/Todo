import React from 'react';

class NewProject extends React.Component {
    render() {
        return (
            <div>
                <h2>New Project Form</h2>
                <form method="post"
                      action="/new-project">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input"
                               type="text"
                               name="project-name"
                               id="project-name" />
                        <label className="mdl-textfield__label"
                               htmlFor="project-name">
                            Project Name
                        </label>
                    </div>
                    <br/>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
                            type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default NewProject;
