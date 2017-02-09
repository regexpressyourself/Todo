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

/*
   connection.query("INSERT INTO users (name) VALUES ('Billy')");
 */

app.get('/projects', (req, res) => {
})

app.get('/stages', (req, res) => {
})

app.get('/issues', (req, res) => {
})

app.post('/new-project', (req, res) => {
})

app.post('/new-stage', (req, res) => {
})

app.post('/new-issue', (req, res) => {
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

connection.end();
