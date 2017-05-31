////////////////////////////////////////
// User Factory
//////////////////////////////////////// 

app.factory('userFactory', ['$http', function($http){
	
	var factory = {};
	
	////////////////////////////////////////
	// Save User Data
	factory.saveData = function(sheetData, callback){
		$http.post('/save', sheetData).then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Save User Data
	////////////////////////////////////////

	////////////////////////////////////////
	// Get User Data
	factory.getData = function(callback){
		$http.get('/admin').then(function(returned_data){
			callback(returned_data.data);
		})
	}
	// END Get User Data
	////////////////////////////////////////

	////////////////////////////////////////
	// Get Users Inspections
	factory.getInspections = function(callback){
		$http.get('/inspection').then(function(returned_data){
			callback(returned_data.data)
		})
	}
	// END Get Users Inspections
	////////////////////////////////////////

	return factory
}])