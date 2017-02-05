import React from 'react';
import axios from 'axios';
import NewProject from './NewProject';
import NewIssue from './NewIssue';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Wow!
                </h1>
                <NewProject></NewProject>
                <br/>
                <hr/>
                <br/>
                <NewIssue></NewIssue>

            </div>
        )
    }
}
export default Home;
