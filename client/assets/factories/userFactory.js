////////////////////////////////////////
// User Factory
//////////////////////////////////////// 

myApp.factory('userFactory', ['$http', function($http){
	
	var factory = {};
	
	////////////////////////////////////////
	// Get Users
	factory.getusers = function(callback){
		$http.get('/admin').then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Get Users
	////////////////////////////////////////

	////////////////////////////////////////
	// Add User
	factory.adduser = function(user,callback){
		$http.post('/create', user).then(function(returned_data){
			callback(returned_data.data);
		})
	}
	// END Add User
	////////////////////////////////////////

	////////////////////////////////////////
	// Log in User
	factory.loginuser = function(user, callback){
		$http.post('/login', user).then(function(returned_data){
			callback(returned_data.data);
		})
	}

	////////////////////////////////////////
	// Get Users Inspections
	factory.getInspections = function(callback){
		$http.get('/inspection').then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Get Users Inspections
	////////////////////////////////////////



	////////////////////////////////////////
	// Get Users Lifts
	factory.getUserLifts = function(callback){
		$http.get('/user/lifts').then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Get Users Inspections
	////////////////////////////////////////



	factory.checkLogin = function(callback){
		$http.get('/loggedin').then(function(returned_data){
			callback(returned_data.data)
		})
	}


	return factory
}])