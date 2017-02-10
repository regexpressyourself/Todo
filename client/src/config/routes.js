import React from 'react';
import App   from '../components/App';
import Home  from '../components/Home';
import EditProject from '../components/EditProject';
import {Router,
        Route,
        browserHistory,
        IndexRoute} from 'react-router';

let routes = (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path="/edit-project" component={EditProject}></Route>
        </Route>
    </Router>
)

export default routes;
