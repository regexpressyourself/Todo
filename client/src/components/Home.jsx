import React from 'react';
import { Link }       from 'react-router';


class Home extends React.Component {
    render() {
        return (
            <div>
                <h1 className="center">
                    To Do
                </h1>
                <hr/>

                <div className="center">
                    <Link to="/login">
                        <button className="btn btn-default hero-button">Log In</button>
                    </Link>

                    <Link to="/signup">
                        <button className="btn btn-primary hero-button">Sign Up</button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default Home;
