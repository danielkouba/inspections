////////////////////////////////////////
// Server Config
////////////////////////////////////////
var path = require('path'),
    users = require('../controllers/users.js'),
    inspections = require('../controllers/inspection.js');

////////////////////////////////////////
// Login Middleware
////////////////////////////////////////

function loginAuthentication(req,res,next){
    if (req.session.userId){
        next();
    } else {
        res.status(401).send("User not found");
    }
}

module.exports = function(app){
    app.get('/', users.index);
    app.get('/admin', users.index);
    app.post('/create', users.create);
    app.post('/inspection/create', inspections.create);
    app.post('/login', users.login);
    app.get('/inspection', inspections.getInspections);
    app.get('/loggedin', users.loggedin);
    // app.use(loginAuthentication);
    // app.post('/appointment', users.appt);
    // app.get('/appointment', users.allAppts);
    // app.post('/appointment/date', users.checkDate);
    // app.post('/appointment/delete', users.deleteAppt);
}