import React from 'react';
import axios from 'axios'
import { Link }       from 'react-router';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }
    componentWillMount() {
        axios.get('/api/isLoggedIn')
             .then((response) => {
                 let isLoggedIn = response.data;

                 if (!isLoggedIn) {
                     this.setState({
                         loggedId: false
                     });
                 }

                 else {
                     this.setState({
                         loggedIn: true
                     });
                 }

             }).catch((error) => {
                 console.log(error);
             });
    }
    render() {
        if (this.state.loggedIn) {
            return (
                <div className="center">
                    <Link to="/projects">
                        <button className="btn btn-primary hero-button">View My Projects</button>
                    </Link>
                </div>
            )
        }
        else {
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
}
export default Home;
