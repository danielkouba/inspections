////////////////////////////////////////
// User Server Side Controller
////////////////////////////////////////
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

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
	this.findType = function(req,res){
		User.find({"type": "lift_owner"}) //.populate('_lifts')
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
		console.log("This is from loggedin VVVV")
		res.json(req.session.user)
		console.log(req.session.user)
		console.log("This is from loggedin ^^^^")
	}
	// END Logged in
	////////////////////////////////////////

}
module.exports = new usersController()