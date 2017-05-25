// ////////////////////////////////////////
// // User Server Side Controller
// ////////////////////////////////////////
// var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var bcrypt = require('bcrypt');
// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
// var generator = require('xoauth2').createXOAuth2Generator({
// 	user: "testtesterson75@gmail.com",
// 	clientId: "137889948897-g2tu5039lemhpri66imaqbhj5892si5s.apps.googleusercontent.com",
// 	clientSecret: "7cM-XT3M0vjhG9Gbc5ErOIcT",
// 	refreshToken: "1/eKWNEk_Ap180Lj-cmbSihWXyELuS36uUDMHTehGiUK8"
// });
// var smtpTrans = nodemailer.createTransport(smtpTransport({
// 	service: "Gmail",
// 	auth: {
// 		xoauth2: generator
// 	}
// }))




// function usersController(){
// 	////////////////////////////////////////
// 	// Index Route
// 	this.index = function(req,res){
// 		User.find({}, function(err,users){
// 			res.json(users);
// 		})
// 	}
// 	// END Index Route
// 	////////////////////////////////////////


// 	////////////////////////////////////////
// 	// Find by type
// 	////////////////////////////////////////
// 	this.getLiftOwners = function(req,res){
// 		User.find({"type": "lift_owner"}).populate('_lifts').exec(function(err,user){
// 			if(!user){
// 				console.log("Something went wrong in liftowner query")
// 				res.json(err)
// 			} else {
// 				console.log("We got all lift owners and their lifts");
// 				res.json(user);
// 			}
// 		})
// 	}

// 	////////////////////////////////////////
// 	// Create Route
// 	this.create = function(req,res){
// 		User.create(req.body, function(err,result){
// 			if(err){
// 				res.json(err)
// 			} else {
				
// 				var mailOpts = {
// 					from: 'Test Testerson', //grab form data from the request body object
// 					to: result.email,
// 					subject: "Welcome to Lift Inspector",
// 					text: "We would like to welcome you to Lift inspector, " + result.name 
// 				};

// 				// smtpTrans.sendMail(mailOpts, function (error, response) {
// 				//       //Email not sent
// 				//     if (error) {
// 				//         res.json({ title: 'Something went wrong', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
// 				//     }
// 				//       //Email sent
// 				//     else {
// 				    		res.json(result) 
// 				//     }
// 				// });

// 			}
// 		})

// 	}
// 	// END Create Route
// 	////////////////////////////////////////


// 	////////////////////////////////////////
// 	// Login Route
// 	this.login = function(req,res){
// 		var errors = {
// 			errors: {
// 				general: 'Invalid Login Information.'
// 			}
// 		}
// 		User.findOne({"email":req.body.email}).populate('_inspections').exec(function(err,user){
// 			if (!user){
// 				res.json(errors);
// 			} else {
// 				bcrypt.compare(req.body.password, user.password, function(err, result) {
// 						if(err){
// 							console.log("There were errors in the BCRYPT")
// 							res.json(errors);
// 						} else if (!result) {
// 							console.log("Password was dead wrong fool");
// 							res.json(errors);
// 						}else{
// 							//Save session user
// 							req.session.user = {
// 								name: user.name,
// 								_id: user._id,
// 								type: user.type,
// 								inspections: user._inspections
// 							}

// 							//Formatting return data
// 							var userdata = {
// 								name: user.name,
// 								_id: user._id,
// 								resetPassword: user.resetPassword,
// 								type: user.type
// 							}
// 							if (user.type == "inspector"){
// 								userdata.inspections = user._inspections
// 							} else if (user.type == "lift_owner"){
// 								userdata.lifts = user.lifts
// 							}

// 							res.json(userdata);
// 						}
// 				});
// 			}
// 		})
// 	}
// 	// END Login Route
// 	////////////////////////////////////////

// 	////////////////////////////////////////
// 	// Logged in ?
// 	////////////////////////////////////////
// 	this.loggedin = function(req,res){
// 		res.json(req.session.user)
// 	}
// 	// END Logged in
// 	////////////////////////////////////////


// 	////////////////////////////////////////
// 	// Recover Password
// 	////////////////////////////////////////
// 	this.recoverPassword = function(req, res){
// 		User.findOne({"email":req.body.email}).exec(function(err, user){
// 			if(!user){
// 				var error = {"error":"Couldn't find email"}
// 				res.json(error)
// 			} else {
// 				var newPassword = passwordGen();
// 				user.password = newPassword;
// 				user.resetPassword = true;
// 				user.save(function(err,result){
// 					if(err){
// 						console.log("Something went wrong saving the user")
// 						res.json(err)
// 					} else {
// 						console.log("Successfully reset user password to random value")
// 						console.log(newPassword)

// 						var mailOpts = {
// 							from: 'Test Testerson', //grab form data from the request body object
// 							to: user.email,
// 							subject: "Password Reset for Lift Inspector",
// 							text: "Here is your temporary password: \n" + newPassword + "\nYou will be prompted to change it when you log in. \n -Lift Inspector Team" 
// 						};

// 						smtpTrans.sendMail(mailOpts, function (error, response) {
// 						      //Email not sent
// 						    if (error) {
// 						        res.json({ title: 'Something went wrong', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
// 						    }
// 						      //Yay!! Email sent
// 						    else {

// 						          res.json({ title: 'You got the right one babayx', msg: 'You successfully sent a message', err: false, page: 'contact' })
// 						    }
// 						});
// 					}
// 				})
// 			}
// 		})
// 	}

// 	// Recover Password
// 	////////////////////////////////////////



// 	////////////////////////////////////////
// 	// Change Password
// 	////////////////////////////////////////
// 	this.changePassword = function(req, res){
// 		User.findOne({"_id":req.session.user._id}).exec(function(err, user){
// 			if(!user){
// 				var error = {"error":"Couldn't find id"}
// 				res.json(error)
// 			} else {
// 				user.password = req.body.password;
// 				user.resetPassword = false;
// 				user.save(function(err,result){
// 					if(err){
// 						console.log("Something went wrong saving the user")
// 						res.json(err)
// 					} else {
// 						var mailOpts = {
// 							from: 'Test Testerson', //grab form data from the request body object
// 							to: user.email,
// 							subject: "Password Changed for Lift Inspector",
// 							text: "Your password for Lift Inspector has been changed. If you did not request this change please contact Lift Inspector Technical team."	
// 						};

// 						smtpTrans.sendMail(mailOpts, function (error, response) {
// 						      //Email not sent
// 						    if (error) {
// 						        res.json({ title: 'Something went wrong', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
// 						    }
// 						      //Yay!! Email sent
// 						    else {
// 						        var userdata = {
// 									name: user.name,
// 									_id: user._id,
// 									resetPassword: user.resetPassword,
// 									type: user.type
// 								}
// 								if (user.type == "inspector"){
// 									userdata.inspections = user._inspections
// 								} else if (user.type == "lift_owner"){
// 									userdata.lifts = user.lifts
// 								}

// 								res.json(userdata);
		
// 						    }
// 						});
// 					}
// 				})
// 			}
// 		})
// 	}

// 	// Change Password
// 	////////////////////////////////////////



// 	////////////////////////////////////////
// 	// Generate Temp Password
// 	////////////////////////////////////////
// 	function passwordGen(){
// 		var pass = [];
// 		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// 		for(var i = 0; i < 10; i++){
// 			var rnd = Math.floor(Math.random()*chars.length);
// 			pass.push(chars[rnd]);
// 		}
// 		return pass.join("")
// 	}


// 	////////////////////////////////////////
// 	// Email Test
// 	////////////////////////////////////////
// 	this.emailContact = function(req,res){

// 		//Creating this was a nightmare, here are some tools to make it easier:
// 		// Read the comments in these as well, they provide some good hints
// 		// nodemailer : https://blog.ragingflame.co.za/2012/6/28/simple-form-handling-with-express-and-nodemailer
// 		// xoauth2 : http://masashi-k.blogspot.fr/2013/06/sending-mail-with-gmail-using-xoauth2.html
// 		// nodemailer-smtp-transport: http://goodheads.io/2015/06/23/how-to-send-emails-using-node-js/
// 		// Maybe this one: http://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-on
// 		var mailOpts = {
// 			from: 'Test Testerson', //grab form data from the request body object
// 			to: 'danielkouba@icloud.com',
// 			subject: "Welcome to Lift Inspector",
// 			text: "We would like to welcome you to Lift inspector " 
// 		};

// 		smtpTrans.sendMail(mailOpts, function (error, response) {
// 		      //Email not sent
// 		    if (error) {
// 		        res.json({ title: 'Something went wrong', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
// 		    }
// 		      //Yay!! Email sent
// 		    else {
// 		          res.json({ title: 'You got the right one babayx', msg: 'You successfully sent a message', err: false, page: 'contact' })
// 		    }
// 		});

// 	}
// }
// module.exports = new usersController()