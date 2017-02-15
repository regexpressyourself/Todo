const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const db          = require('./server_modules/db');

let add_project_by_email   = db.add_project_by_email;
let get_projects_by_email  = db.get_projects_by_email;
let get_projects_by_userid = db.get_projects_by_userid;
let get_project_by_id=      db.get_project_by_id;

app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const USEREMAIL = 'samuel.messina@gmail.com'; // TODO get user data from login
//const USERID    = 1; // TODO get user id from login

app.get('/api/project', (req, res) => {
    if (req.query.projectId){
        get_project_by_id(req.query.projectId, (project) => {
            res.send(project[0]);
        });
    }
});

app.get('/api/projects', (req, res) => {
    if (req.query.userId && req.body) {
        get_projects_by_userid(req.query.userId, (project_list) => {
            res.send(project_list);
        });
    }
});

app.get('/api/stages', (req, res) => {
});

app.get('/api/issues', (req, res) => {
});

app.post('/api/new-project', (req, res) => {
    if (req.body && req.body['project-name']) {
        add_project_by_email(req.body['project-name'], USEREMAIL);
        res.redirect('/');
    }
});

app.post('/api/new-stage', (req, res) => {
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


