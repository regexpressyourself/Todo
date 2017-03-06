require('dotenv').config();
const express        = require('express');
const session        = require('express-session');
const app            = express();
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const passport       = require('passport');
const flash          = require('connect-flash');
const session_secret = process.env.SESSION_SECRET;

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

require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


