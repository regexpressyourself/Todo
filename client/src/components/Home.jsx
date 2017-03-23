import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Wow!
                </h1>
                <hr/>
                <h2>Create</h2>
                <form method="post" action="/create-account">
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
                <br/>
                <h2>Login</h2>
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
        )
    }
}
export default Home;
