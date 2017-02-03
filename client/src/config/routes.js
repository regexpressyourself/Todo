import React from 'react';
import App   from '../components/App';
import Home  from '../components/Home';
import {Router,
        Route,
        browserHistory,
        IndexRoute} from 'react-router';

let routes = (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
)

export default routes;
