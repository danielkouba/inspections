"use strict";

////////////////////////////////////////
// Import Packages
////////////////////////////////////////
var mongoose 	= require('mongoose'),
	express  	= require('express'),
	session  	= require('express-session'),
	bp		 	= require('body-parser'),
	path	 	= require('path'),
	nodemailer  = require('nodemailer'),
	root	 	= __dirname,
	port	 	= process.env.PORT || 8000,
	app		 	= express();

////////////////////////////////////////
// Configure Session
////////////////////////////////////////
var sessionConfig = {
	secret:'SuperSecretCookie',
	resave:false,
	saveUninitialized:true,
	name:'myCookie',
	cookie:{
		secure: false,
		httpOnly:false,
		maxAge: 3600000
	}
}

////////////////////////////////////////
// Configure Body Parser and Express
////////////////////////////////////////
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended:true}));
app.use(express.static(path.join(root,'client')));
app.use(session(sessionConfig));

////////////////////////////////////////
// Import Routes and Connect Mongoose
////////////////////////////////////////
// require('./server/config/mongoose.js');
require('./server/config/routes')(app);


////////////////////////////////////////
// Start Server
////////////////////////////////////////

app.listen(port, function(){
	console.log('server running on ' + port);
})