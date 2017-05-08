////////////////////////////////////////
// User Server Side Controller
////////////////////////////////////////
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



function usersController(){
	////////////////////////////////////////
	// Index Route
	this.index = function(req,res){
		User.find({}, function(err,users){
			res.json(users);
		})
	}
	// END Index Route
	////////////////////////////////////////


	////////////////////////////////////////
	// Find by type
	////////////////////////////////////////
	this.getLiftOwners = function(req,res){
		User.find({"type": "lift_owner"}).populate('_lifts').exec(function(err,user){
			if(!user){
				console.log("Something went wrong in liftowner query")
				console.log(err)
				res.json(err)
			} else {
				console.log("We got all lift owners and their lifts");
				res.json(user);
			}
		})
	}




	////////////////////////////////////////
	// Create Route
	this.create = function(req,res){
		User.create(req.body, function(err,result){
			if(err){
				res.json(err)
			} else {
				res.json(result)
			}
		})

	}
	// END Create Route
	////////////////////////////////////////


	////////////////////////////////////////
	// Login Route
	this.login = function(req,res){
		var errors = {
			errors: {
				general: 'Invalid Login Information.'
			}
		}
		User.findOne({"email":req.body.email}).populate('_inspections').exec(function(err,user){
			if (!user){
				res.json(errors);

			} else {
				bcrypt.compare(req.body.password, user.password, function(err) {
						if(err){
							res.json(errors);
						}
				});

				//Save session user
				req.session.user = {
					name: user.name,
					_id: user._id,
					type: user.type,
					inspections: user._inspections
				}

				//Formatting return data
				var userdata = {
					name: user.name,
					_id: user._id,
					type: user.type
				}
				if (user.type == "inspector"){
					userdata.inspections = user._inspections
				} else if (user.type == "lift_owner"){
					userdata.lifts = user.lifts
				}

				res.json(userdata);
			}
		})
	}
	// END Login Route
	////////////////////////////////////////

	////////////////////////////////////////
	// Logged in ?
	////////////////////////////////////////
	this.loggedin = function(req,res){
		res.json(req.session.user)
	}
	// END Logged in
	////////////////////////////////////////


	////////////////////////////////////////
	// Email Test
	////////////////////////////////////////
	this.emailContact = function(req,res){

		//Creating this was a nightmare, here are some tools to make it easier:
		// Read the comments in these as well, they provide some good hints
		// nodemailer : https://blog.ragingflame.co.za/2012/6/28/simple-form-handling-with-express-and-nodemailer
		// xoauth2 : http://masashi-k.blogspot.fr/2013/06/sending-mail-with-gmail-using-xoauth2.html
		// nodemailer-smtp-transport: http://goodheads.io/2015/06/23/how-to-send-emails-using-node-js/
		// Maybe this one: http://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one



		var mailOpts, smtpTrans;


		var generator = require('xoauth2').createXOAuth2Generator({
			user: "testtesterson75@gmail.com",
			clientId: "137889948897-g2tu5039lemhpri66imaqbhj5892si5s.apps.googleusercontent.com",
			clientSecret: "7cM-XT3M0vjhG9Gbc5ErOIcT",
			refreshToken: "1/eKWNEk_Ap180Lj-cmbSihWXyELuS36uUDMHTehGiUK8"
		});

		smtpTrans = nodemailer.createTransport(smtpTransport({
			service: "Gmail",
			auth: {
				xoauth2: generator
			}
		}))

		mailOpts = {
			from: 'Test Testerson', //grab form data from the request body object
			to: 'danielkouba@icloud.com',
			subject: 'Website contact form',
			text: "Beef stew"
		};

		smtpTrans.sendMail(mailOpts, function (error, response) {
		      //Email not sent
		    if (error) {
		        res.json({ title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
		    }
		      //Yay!! Email sent
		    else {
		          res.json({ title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
		    }
		});

	}
}
module.exports = new usersController()