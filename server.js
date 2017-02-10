const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser')
const mysql       = require('mysql');

require('dotenv').config();

app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

let db_user = process.env.DB_USER;
let db_pw   = process.env.DB_PASSWORD;
let db;

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : db_user,
    password : db_pw,
    database : 'todo'
});

connection.connect();

const USEREMAIL = "samuel.messina@gmail.com"; // TODO get user data from login

function get_user_id_by_email(user_email, callback) {
    let query_string = "SELECT id FROM users WHERE email='" +
                       user_email + "' " +
                       "LIMIT 1;";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        callback(results[0]["id"]);
    });
}

function add_new_project_by_user_email(project_name, user_email) {
    get_user_id_by_email(user_email, (user_id) => {
        let query_string = "INSERT INTO projects (name, userId) " +
                           "VALUES ('" + project_name  + "', " + user_id +
                           ");";
        connection.query(query_string, (error, results, fields) => {
            if (error) console.log(error);
        });
    });
}

function get_projects_by_user_email(user_email, callback){
    get_user_id_by_email(user_email, (user_id) => {
        let query_string = "SELECT * FROM projects WHERE userId=" +
                           user_id + ";";

        connection.query(query_string, (error, results, fields) => {
            if (error) console.log(error);
            results = parse_projects_list_from_db(results);
            callback(results);
        });
    });
}

function parse_projects_list_from_db(project_list) {
    return (
        project_list.map((project_item) => {
            return {
                id:   project_item["id"],
                name: project_item["name"]
            }
        })
    )
}

app.get('/api/projects', (req, res) => {
    if (req.body) {
        get_projects_by_user_email(USEREMAIL, (project_list) => {
        res.send(project_list);
        });
    }

})

app.get('/api/stages', (req, res) => {
})

app.get('/api/issues', (req, res) => {
})

app.post('/api/new-project', (req, res) => {
    if (req.body && req.body["project-name"]) {
        add_new_project_by_user_email(req.body["project-name"], USEREMAIL);
        res.redirect('/');

    }
})

app.post('/api/new-stage', (req, res) => {
})

app.post('/api/new-issue', (req, res) => {
})

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


