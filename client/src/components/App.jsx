import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

import Home  from '../components/Home';
require('../assets/css/main.scss');

class App extends React.Component {
    componentDidMount() {
        this.getLogin();
    }

    getLogin() {
        axios.get('/api/isLoggedIn')
        .then((response) => {
            let isLoggedIn = response.data;
            if (!isLoggedIn)
                browserHistory.push('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children)}
            </div>
        )
    }
}
export default App;
