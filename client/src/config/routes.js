import React from 'react';
import App   from '../components/App';
import Home  from '../components/Home';
import EditProject from '../components/EditProject';
import Kanban from '../components/Kanban';
import Projects from '../components/Projects';
import {Router,
        Route,
        browserHistory,
        IndexRoute} from 'react-router';

let routes = (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path="/edit-project" component={EditProject}></Route>
            <Route path="/projects" component={Projects}></Route>
            <Route path="/projects/views/kanban(/:projectId)" component={Kanban}></Route>
        </Route>
    </Router>
)

export default routes;
