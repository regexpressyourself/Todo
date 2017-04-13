import React from 'react';
import axios from 'axios';
import Nav from './Nav';
import {browserHistory} from 'react-router';

require('../assets/css/main.scss');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
    }
    componentWillMount() {
        this.getLogin();
    }

    getLogin() {
        axios.get('/api/isLoggedIn')
        .then((response) => {
            let isLoggedIn = response.data;
            console.log(isLoggedIn);

            if (!isLoggedIn && window.location.pathname !== "/") {
                this.setState({
                    loggedId: false,
                    nav: <Nav loggedIn={false}/>
                });
                browserHistory.push('/');
            }

            else if (!isLoggedIn) {
                this.setState({
                    loggedId: false,
                    nav: <Nav loggedIn={false}/>
                });
            }

            else {
                this.setState({
                    loggedIn: true,
                    nav: <Nav loggedIn={true}/>
                });
            }

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {this.state.nav}
                <br/><br/><br/><br/>
                {React.cloneElement(this.props.children)}
            </div>
        )
    }
}
export default App;
