const express        = require('express');
const session        = require('express-session');
const app            = express();
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const db             = require('./config/db');
const passport       = require('passport');
const flash          = require('connect-flash');
const session_secret = process.env.SESSION_SECRET;

const {add_project_by_id,
       get_projects_by_email,
       get_projects_by_userid,
       get_project_by_id,
       add_new_stage_to_project} = db;

require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser()); // read cookies (needed for auth)

app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true
} )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const USEREMAIL = 'samuel.messina@gmail.com'; // TODO get user data from login
//const USERID    = 1; // TODO get user id from login

app.post('/create-account',
         // Create account form submits here
         passport.authenticate('local-signup',
                               { successRedirect: '/projects',
                                 failureRedirect: '/',
                                 failureFlash: true}));

app.post('/login', 
         passport.authenticate('local-login',
                               { successRedirect: '/projects',
                                 failureRedirect: '/',
                                 failureFlash: true}));


app.get('/api/isLoggedIn', (req, res) => {
    // Check if user is logged in
    let isLoggedIn = false;
    if (req.isAuthenticated()) {
        // Send true if user is logged in
        isLoggedIn = true;
        res.send(isLoggedIn);
    }
    else {
        // Send false if user is not logged in
        res.send(isLoggedIn);
    }
    // if they aren't redirect them to the home page
});

app.get('/api/project', (req, res) => {
    // Get a project by id
    if (req.query.projectId){
        get_project_by_id(req.query.projectId, (project) => {
            res.send(project[0]);
        });
    }
});

app.get('/api/projects', (req, res) => {
    // Get projects by userId
    if (req.user && req.user.id && req.body) {
        get_projects_by_userid(req.user.id, (project_list) => {
            res.send(project_list);
        });
    }
});

app.get('/api/stages', (req, res) => {
});

app.get('/api/issues', (req, res) => {
});

app.post('/api/new-project', (req, res) => {
    if (req.body &&
        req.body['projectName'] &&
        req.user &&
        req.user.id) {
        add_project_by_id(req.body.projectName, req.body.stageList, req.user.id);
        res.redirect('/projects');
    }
    else {
        res.redirect('/');
    }
});

app.post('/api/new-stage', (req, res) => {
    if (req.body &&
        req.body['stage-name'] &&
        req.body['stage-order'] &&
        req.body['parent-project']) {

        add_new_stage_to_project(req.body['stage-name'],
                                 req.body['stage-order'],
                                 req.body['parent-project']);
        res.redirect('/projects/views/kanban/' + req.body['parent-project']);
    }
});

app.post('/api/new-issue', (req, res) => {
});

app.post('/api/edit-project', (req, res) => {
    if (req.body && req.body['project-name']) {
        add_project_by_email(req.body['project-name'], USEREMAIL);
        res.redirect('/');
    }
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


