import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';

require('../assets/css/main.scss');

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            navLinks: ""
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.setState({
                navLinks: (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/projects">
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/account">
                                My Account
                            </Link>
                        </li>
                        <li >
                            <a href="/" onClick={this.logout()}>
                                Log Out
                            </a>
                        </li>
                    </ul>
                )
            });
        }
        else {
            this.setState({
                navLinks: (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </li>

                    </ul>
                )
            });
        }
    }

    logout() {
        axios.get('/logout')
             .then((response) => {
             }).catch((error) => {
                 console.log(error);
             });
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">
                            To Do
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {this.state.navLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;
