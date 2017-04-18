import React from 'react';
import axios from 'axios';

class Account extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
        console.log("account page");
        axios.get('/api/currentUserInfo')
        .then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                hi
            </div>

        )
    }
}

export default Account;
