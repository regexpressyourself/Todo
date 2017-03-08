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

export function update_stage_order(stage_list, callback) {
    let query_string = "";
    for (let i = 0; i < stage_list.length; i++) {
        query_string = query_string +
            "UPDATE stages SET order=" + stage_list[i].stageOrder +
            "WHERE id=" + stage_list[i].stageId + "; ";
    }
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        callback();
    });
}

export function get_project_by_id(project_id, callback) {
    let query_string = "SELECT * FROM projects WHERE id='" +
        project_id + "' " + "LIMIT 1;";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        add_stages_to_projects(results, (project) => {
            callback(project);
        });

    });

}

export function get_userid_by_email(user_email, callback) {
    let query_string = "SELECT id FROM users WHERE email='" +
                       user_email + "' " +
                       "LIMIT 1;";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        callback(results[0]["id"]);
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

export function get_projects_by_userid(user_id, callback){
    let query_string = "SELECT * FROM projects WHERE userId=" +
        user_id + ";";

    connection.query(query_string, (error, results, fields) => {

        if (error) console.log(error);

        results = parse_project_list(results);
        results = add_stages_to_projects(results, (response) => {
            callback(response);
        });
    });
}

export function get_stages_by_projectid(project_id) {
    return new Promise((resolve, reject) => {
        let query_string = "SELECT * FROM stages WHERE projectId=" +
            project_id + ";";

        connection.query(query_string, (error, results, fields) => {
            if (error)    reject(error);
            resolve(results);
        });
    });

}

export function add_project_by_id(project_name, stage_list, user_id) {
    let query_string = "INSERT INTO projects (name, userId) " +
        "VALUES ('" + project_name  + "', " + user_id +
        ");";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        for (let i = 0; i < stage_list.length; i++) {
            add_new_stage_to_project(stage_list[i], i, results.insertId);
        }
    });
}

export function add_new_stage_to_project(stage_name, stage_order, parent_project) {
    let query_string = "INSERT INTO stages (`name`, `order`, `projectId`) " +
        "VALUES ('" + stage_name + "', " + stage_order + ", "
        + parent_project + ");";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
    });
}

export function add_stages_to_projects(project_list, callback) {
    let promises = project_list.map((project) => {
        return get_stages_by_projectid(project.id)
            .then((stage_list) => {
                project["stageList"] = stage_list;
                return project;
            });
    });
    catch_promises(promises, callback);
}

export function catch_promises(promises, callback) {
    Promise.all(promises)
        .then(result => {
            callback(result);
        })
        .catch(error => {
            console.error(error);
        });

}

export function parse_project_list(project_list) {
    return project_list.map((project_item) => {
        return ({
            id:   project_item["id"],
            name: project_item["name"]
        });
    });
}

module.exports = {
    get_userid_by_email:    get_userid_by_email,
    add_project_by_id:   add_project_by_id,
    get_projects_by_email:  get_projects_by_email,
    parse_project_list:     parse_project_list,
    get_projects_by_userid: get_projects_by_userid,
    get_project_by_id:      get_project_by_id,
    update_stage_order:      update_stage_order,
    add_new_stage_to_project: add_new_stage_to_project
};
