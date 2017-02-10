require('dotenv').config();

const mysql = require('mysql');
let db_user = process.env.DB_USER;
let db_pw   = process.env.DB_PASSWORD;

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : db_user,
    password : db_pw,
    database : 'todo'
});

connection.connect();

export function get_userid_by_email(user_email, callback) {
    let query_string = "SELECT id FROM users WHERE email='" +
                       user_email + "' " +
                       "LIMIT 1;";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        callback(results[0]["id"]);
    });
}

export function add_project_by_email(project_name, user_email) {
    get_userid_by_email(user_email, (user_id) => {
        let query_string = "INSERT INTO projects (name, userId) " +
                           "VALUES ('" + project_name  + "', " + user_id +
                           ");";
        connection.query(query_string, (error, results, fields) => {
            if (error) console.log(error);
        });
    });
}

export function get_projects_by_email(user_email, callback){
    get_userid_by_email(user_email, (user_id) => {
        let query_string = "SELECT * FROM projects WHERE userId=" +
                           user_id + ";";

        connection.query(query_string, (error, results, fields) => {
            if (error) console.log(error);
            results = parse_project_list(results);
            callback(results);
        });
    });
}

export function parse_project_list(project_list) {
    return (
        project_list.map((project_item) => {
            return {
                id:   project_item["id"],
                name: project_item["name"]
            }
        })
    )
}

module.exports = {
    get_userid_by_email:   get_userid_by_email,
    add_project_by_email:  add_project_by_email,
    get_projects_by_email: get_projects_by_email,
    parse_project_list:    parse_project_list
};
