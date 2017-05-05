////////////////////////////////////////
// User Factory
//////////////////////////////////////// 

myApp.factory('formFactory', ['$http', function($http){
	
	var factory = {};
	
	////////////////////////////////////////
	// Add User
	factory.submitForm = function(formData,callback){
		$http.post('/inspection/create', formData).then(function(returned_data){
			callback(returned_data.data);
		})
	}

	factory.addlift = function(formData, callback){
		console.log("Made it to the factory with this data");
		console.log(formData);
		$http.post('/lift/create', formData).then(function(returned_data){
			callback(returned_data.data)
		})
	}


	return factory
}])