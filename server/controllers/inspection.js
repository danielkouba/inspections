// ////////////////////////////////////////
// // User Server Side Controller
// ////////////////////////////////////////


// var mongoose = require('mongoose');
// var Inspection = mongoose.model('Inspection');
// var User = mongoose.model('User');
// var Lift = mongoose.model('Lift');

// function inspectionsController(){

// 	////////////////////////////////////////
// 	// Index Route
// 	this.index = function(req,res){
// 		Inspection.find({}, function(err,inspections){
// 			res.json(inspections);
// 		})
// 	}
// 	// END Index Route
// 	////////////////////////////////////////

// 	////////////////////////////////////////
// 	// Create Route
// 	this.create = function(req,res){
// 		Inspection.create(req.body, function(err,inspection){
// 			if(err){
// 				res.json(err)
// 			} else {
// 				User.findOne({"_id": req.session.user._id}).exec(function(err,user){
// 					if(err){
// 						res.json(err);
// 					} else {
// 						user._inspections.push(inspection);
// 						user.save(function(err,result){
// 							if(err){
// 								res.json(err)
// 							} else {

// 								Lift.findOne({"_id":req.body.lift_id}).exec(function(err,lift){
// 									if(!lift){
// 										console.log("We didnt find a lift")
// 										res.json(errors)		
// 									} else {
// 										console.log("We found a lift and are pushing inspections to it")
// 										lift._inspections.push(inspection)
// 										lift.save(function(err, data){
// 											if(err){
// 												console.log("Something wend wrong saving the lift")
// 												res.json(err)
// 											} else {
// 												console.log("We made it fam")
// 												res.json(result)
// 											}
// 										})
// 									}
// 								})
// 							}
// 						})
// 					}
// 				})
// 			}
// 		})

// 	}
// 	// END Create Route
// 	////////////////////////////////////////


// 	this.getInspections = function(req,res){
// 		console.log(req.session.user)
// 		if (!req.session.user){
// 			res.json({'errors' : 'Please log in to see this info'})
// 		} else {
// 			User.findOne({"_id":req.session.user._id}).populate('_inspections').exec(function(err,user){
// 				var errors =  {'errors' : 'Please log in to see this info'};
// 				if (!user){
// 					console.log("There was something wrong with the query");
// 					console.log(err);
// 					res.json(errors);
// 				} else {
// 					//Save session user
// 					req.session.user.inspections = user._inspections;
// 					res.json(user._inspections);
					
// 				}
// 			})	
// 		}
		
// 	}



// }
// module.exports = new inspectionsController()