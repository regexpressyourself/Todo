// Backend Routes and API calls

module.exports = function(app, passport) {
    const db             = require('./db');
    const {add_project_by_id,
           get_projects_by_email,
           add_issue,
           get_projects_by_userid,
           get_issues_by_stage_id,
           update_stage_name,
           get_project_by_id,
           update_stage_order,
           add_new_stage_to_project} = db;


    app.post('/create-account',
             // Create account form submits here
             passport.authenticate('local-signup',
                                   { successRedirect: '/projects',
                                     failureRedirect: '/',
                                     failureFlash: true}));

    app.post('/login',
             // Login submits here
             passport.authenticate('local-login',
                                   { successRedirect: '/projects',
                                     failureRedirect: '/',
                                     failureFlash: true}));
    app.get('/logout', (req, res) =>{
        // Login submits here
        req.logout();
        res.redirect('/');
    });


    app.get('/api/currentUserInfo', (req, res) => {
        console.log("hello");
        console.log(req);
        console.log(res);
    });

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
        if (req.query &&
            req.query.stageId &&
            req.user &&
            req.user.id) {
            get_issues_by_stage_id(req.query.stageId, (results) => {
                res.send(results);
            });
        }

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
            req.user &&
            req.user.id &&
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
        if (req.body &&
            req.user &&
            req.user.id &&
            req.body['name'] &&
            req.body['stage-id']) {
            add_issue(req.body);
            res.redirect(req.get('referer')); // send back from whence ye came
        }
    });

    app.post('/api/update-stage-order', (req, res) => {
        if (req.body && req.body.stageList) {
            update_stage_order(req.body.stageList);
        }
    });

    app.post('/api/edit-project', (req, res) => {
    });

    app.post('/api/edit-stage', (req, res) => {
        if (req.body &&
            req.user &&
            req.user.id &&
            req.body['stage-name'] &&
            req.body['stage-id']) {
            update_stage_name(req.body['stage-name'], req.body['stage-id']);
            res.redirect(req.get('referer')); // send back from whence ye came
        }
        else {
            console.log("Error editing stage");
        }
    });

};
