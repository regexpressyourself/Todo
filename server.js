const express     = require('express');
const app         = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser')

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
let db_url  = 'mongodb://'          +
              db_user + ':' + db_pw +
              '@ds139989.mlab.com:39989/regexpressyourself-todo';
let db;

MongoClient.connect(db_url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
});

app.get('/projects', (req, res) => {
    let collectionName = "sam"; //update which user
    db.collection(collectionName).find().toArray(function(err, results) {
        let projectList = [];
        if (results) {
            for (let i = 0; i < results.length; i++) {
                let projectId = results[i]["_id"];
                let projectName = results[i]["project-name"];
                projectList.push(
                    {projectId: projectId,
                     projectName: projectName
                    }
                );
            }
        }
        res.send(projectList);
    });
})

app.post('/new-project', (req, res) => {
    let collectionName = "sam"; //update which user
    db.collection(collectionName).save(req.body, (err, result) => {
        if (err) {
            return console.log("oops: " + err);
        }
        console.log('saved to database')
        res.redirect('/')
    })
})

app.post('/new-stage', (req, res) => {
    let collectionName = "sam"; //update which user
    db.collection(collectionName).save(req.body, (err, result) => {
        if (err) {
            return console.log("oops: " + err);
        }
        console.log('saved to database')
        res.redirect('/')
    })
})

app.post('/new-issue', (req, res) => {
    let collectionName = "sam"; //update which user
    db.collection(collectionName).save(req.body, (err, result) => {
        if (err) {
            return console.log("oops: " + err);
        }
        console.log('saved to database')
        res.redirect('/')
    })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
