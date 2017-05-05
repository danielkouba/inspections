////////////////////////////////////////
// User Factory
//////////////////////////////////////// 

myApp.factory('formFactory', ['$http', function($http){
	
	var factory = {};
	
	////////////////////////////////////////
	// Get Users
	factory.getusers = function(callback){
		$http.get('/').then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Get Users
	////////////////////////////////////////

	////////////////////////////////////////
	// Add User
	factory.submitForm = function(formData,callback){
		$http.post('/inspection/create', formData).then(function(returned_data){
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

	factory.home = function(callback){
		$http.get('/home').then(function(data){
			callback(data.data);
		})
	}


	factory.addAppt = function(appt, callback){
		$http.post('/appointment', appt).then(function(data){
			callback(data.data);
		})
	}

	factory.getAllAppts = function(callback){
		$http.get('/appointment').then(function(data){
			callback(data.data)
		})
	}

	factory.deleteAppt = function(appt, callback){
		$http.post('/appointment/delete', appt).then(function(data){
			callback(data.data)
		})
	}
	factory.getnumberofdates = function(date, callback){
		$http.post('/appointment/date', date).then(function(data){
			callback(data.data)
		})
	}


	return factory
}])