////////////////////////////////////////
// Server Config

var path = require('path'),
    users = require('../controllers/users.js');
    // inspections = require('../controllers/inspection.js');
//     lifts = require('../controllers/lift.js');

////////////////////////////////////////
// Login Middleware
////////////////////////////////////////

// function loginAuthentication(req,res,next){
//     if (req.session.userId){
//         next();
//     } else {
//         res.status(401).send("User not found");
//     }
// }

module.exports = function(app){
    app.get('/', users.index);
    app.get('/admin', users.index);
    app.post('/save', users.save);
//     app.post('/inspection/create', inspections.create);
//     app.post('/lift/create', lifts.create);
//     app.get('/user/lifts', lifts.getUserLifts);
//     app.post('/login', users.login);
//     app.get('/inspection', inspections.getInspections);
//     app.get('/loggedin', users.loggedin);
//     app.get('/user/liftowners', users.getLiftOwners);
//     app.post('/user/forgotpassword', users.recoverPassword);
//     app.post('/user/changepassword', users.changePassword);
//     app.get('/contact', users.emailContact);
}