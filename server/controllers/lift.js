////////////////////////////////////////
// User Server Side Controller
////////////////////////////////////////


var mongoose = require('mongoose');
var Inspection = mongoose.model('Inspection');
var Lift = mongoose.model('Lift');
var User = mongoose.model('User');

function inspectionsController(){

	////////////////////////////////////////
	// Index Route
	this.index = function(req,res){
		Lift.find({}, function(err,lifts){
			res.json(lifts);
		})
	}
	// END Index Route
	////////////////////////////////////////

	////////////////////////////////////////
	// Create Route
	this.create = function(req,res){
		console.log("Made it to lift controller with this data");
		console.log(req.body)
		console.log(req.session.user)
		Lift.create(req.body, function(err,lift){
			console.log("Creating LIFT VVVVVVV")
			console.log(err)
			console.log(lift)
			console.log("Creating LIFT VVVVVVV")
			if(err){
				res.json(err)
			} else {
				User.findOne({"_id": req.session.user._id}).exec(function(err,user){
					if(err){
						console.log("failed to add lift to user")
						res.json(err);
					} else {
						console.log("Pushing lift to user")
						user._lifts.push(lift);
						user.save(function(err,result){
							if(err){
								console.log("Something went wrong saving the user")
								res.json(err)
							} else {
								console.log("Successfully added lift to user")
								res.json(result)

							}
						})
					}
				})
			}
		})

	}
	// END Create Route
	////////////////////////////////////////


	this.getUserLifts = function(req,res){
		console.log(req.session.user)
		if (!req.session.user){
			res.json({'errors' : 'Please log in to see this info'})
		} else {
			User.findOne({"_id":req.session.user._id}).populate('_lifts').exec(function(err,user){
				var errors =  {'errors' : 'Please log in to see this info'};
				console.log("THIS IS FROM GET LIFTSVVVVV");
				console.log(req.session.user._id);
				console.log(user);
				console.log("THIS IS FROM GET LIFTS^^^^");
				if (!user){
					console.log("There was something wrong with the query");
					console.log(err);
					res.json(errors);
				} else {
					//Save session user
					req.session.user.lifts = user._lifts;
					res.json(user._lifts);
				}
			})	
		}
		
	}



}
module.exports = new inspectionsController()