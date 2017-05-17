////////////////////////////////////////
// User Factory
//////////////////////////////////////// 
app.factory('formFactory', ['$http', function($http){
	
	var factory = {};
	
	////////////////////////////////////////
	// Add User
	factory.submitForm = function(formData,callback){
		$http.post('/inspection/create', formData).then(function(returned_data){
			callback(returned_data.data);
		})
	}

	factory.addlift = function(formData, callback){
		$http.post('/lift/create', formData).then(function(returned_data){
			callback(returned_data.data)
		})
	}

	factory.getLiftOwners =  function(callback){
		$http.get('/user/liftowners').then(function(returned_data){
			callback(returned_data.data)
		})
	}

	return factory
}])