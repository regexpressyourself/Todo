import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Log In
                </h1>
                <hr/>
                <div className="user-form-wrapper">
                    <form method="post" action="/login">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input name="email" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" className="form-control" type="password" />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default Login;
