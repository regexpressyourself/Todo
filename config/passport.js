let LocalStrategy = require('passport-local').Strategy;
let bcrypt        = require('bcrypt-nodejs');
let mysql         = require('mysql');
let db_user       = process.env.DB_USER;
let db_pw         = process.env.DB_PASSWORD;

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : db_user,
    password : db_pw,
    database : 'todo'
});


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from users where id = "+id,function(err,rows){
            done(err, rows[0]);
        });
    });


    /***********************************************************
    * LOGIN
    ************************************************************/
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query("select * from users where email = '"+ email+"'",
                         (err,rows) => {
                             if (err)
                                 return done(err);
                             if (rows.length) {
                                 return done(null,
                                             false,
                                             req.flash('signupMessage',
                                                       'That email is already taken.'));
                             } else {

                                 // if there is no user with that email
                                 // create the user
                                 var newUserMysql = new Object();

                                 newUserMysql.email    = email;
                                 newUserMysql.password = bcrypt.hashSync(password, null, null);

                                 password = bcrypt.hashSync(password, null, null);

                                 var insertQuery = "INSERT INTO users ( email, password ) values ('" +
                                                   email +"','"+ password +"')";
                                 connection.query(insertQuery,function(err,rows){
                                     newUserMysql.id = rows.insertId;
                                     return done(null, newUserMysql);
                                 });
                             }
                         });
    }));

    /***********************************************************
    * SIGN UP
    ************************************************************/
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => { // callback with email and password from our form

        connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",
                         (err,rows) => {
                             if (err)
                                 return done(err);
                             if (!rows.length) {
                                 return done(null,
                                             false,
                                             req.flash('loginMessage',
                                                       'No user found.')); // req.flash is the way to set flashdata using connect-flash
                             }

                             // if the user is found but the password is wrong
                             if (!bcrypt.compareSync(password, rows[0].password))
                                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                             // all is well, return successful user
                             return done(null, rows[0]);

                         });
    }));


};
