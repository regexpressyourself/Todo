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
    /**
     * UPDATE stages SET `order` =
     *   CASE
     *      WHEN id=<id>  THEN <order>
     *   END
     *   WHERE id IN (<id>);
     **/

    let case_string = "UPDATE stages SET `order` = CASE ";
    let where_string = "WHERE id in (";
    for (let i = 0; i < stage_list.length; i++) {
        case_string = case_string +
            " WHEN id="+ stage_list[i].stageId +
            " THEN " + stage_list[i].stageOrder;
        if (i < stage_list.length - 1)
            where_string += stage_list[i].stageId + ", ";
        else
            where_string += stage_list[i].stageId + ");";
    }
    case_string += " ELSE `order` END ";
    let query_string = case_string + where_string;
    if (query_string.length > 0)
        connection.query(query_string, (error, results, fields) => {
            if (error) console.log(error);
            if (callback) callback();
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

export function update_stage_name(stage_name, stage_id) {
    let query_string = "UPDATE stages SET name='"+stage_name+"' WHERE id="+stage_id;
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
    });
}

export function get_issues_by_stage_id(stage_id, callback) {
    let query_string = "SELECT * FROM issues WHERE stageId="+stage_id+";";
    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        if (callback) callback(results);
    });
}
export function add_issue(issue, callback) {

    issue = check_values_on_issue(issue);

    let query_string = "INSERT INTO issues " +
        "(name, description, dueDate, startTime, endTime, priority, stageId) " +
        "VALUES ('" + issue.name + "', '" + issue.description + "', '" +
        issue.date + "', '" + issue.startTime + "', '" + issue.endTime + "', '" +
        issue.priority + "', " + issue["stage-id"] + ");";

    connection.query(query_string, (error, results, fields) => {
        if (error) console.log(error);
        if (callback) callback(results);
    });
}

function check_values_on_issue(issue) {
    issue.name        = issue.name ? issue.name : "";
    issue.description = issue.description ? issue.description : "";
    issue.date        = issue.date ? issue.date : "";
    issue.startTime   = issue.startTime ? issue.startTime : "";
    issue.endTime     = issue.endTime ? issue.endTime : "";
    issue.priority    = issue.priority ? issue.priority : "";
    issue.stageId     = issue.stageId ? issue.stageId : "";
    return issue;
}

module.exports = {
    get_userid_by_email:    get_userid_by_email,
    add_project_by_id:   add_project_by_id,
    get_projects_by_email:  get_projects_by_email,
    parse_project_list:     parse_project_list,
    get_projects_by_userid: get_projects_by_userid,
    get_project_by_id:      get_project_by_id,
    update_stage_order:      update_stage_order,
    update_stage_name:        update_stage_name,
    add_issue:                add_issue, 
    get_issues_by_stage_id:   get_issues_by_stage_id,
    add_new_stage_to_project: add_new_stage_to_project
};
