// ////////////////////////////////////////
// // User Server Side Controller
// ////////////////////////////////////////

function usersController(){



	////////////////////////////////////////
	// Index Route
	this.index = function(req,res){
		if (!req.session){
			res.json({'cool':'beans'});	
		} else {
			res.json(req.session);
		}
	}
	// END Index Route
	////////////////////////////////////////

	////////////////////////////////////////
	//  Save Data in Session
 	this.save = function(req, res){
 		// Save request to session
 		req.session[req.body.title] = req.body.data;
 		req.session.save();
 		res.send(req.session);
 	}
	//  END Save Data in Session
	////////////////////////////////////////
}
module.exports = new usersController()

