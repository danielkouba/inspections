myApp.controller('userController', function($location, $scope, $cookies, userFactory, UserService){

	////////////////////////////////////////
	// Constructors
	////////////////////////////////////////
	$scope.adminView = function() {
		$scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		if (!$cookies.get('type')){
			$location.url('/');
		} else if ($cookies.get('type') == 'inspector') {
			$location.url('/dashboard/inspector');
		} else if ($cookies.get('type') == 'lift_owner'){
			$location.url('/dashboard/liftowner');
		} else {
			//The Correct Path
			getAllUsers();			
		}

	}
	$scope.inspectorView = function() {
		$scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		if (!$cookies.get('type')){
			$location.url('/');
		} else if ($cookies.get('type') == 'admin') {
			$location.url('/dashboard/admin');
		} else if ($cookies.get('type') == 'lift_owner'){
			$location.url('/dashboard/liftowner');
		} else {
			//The Correct Path

			$scope.getInspections()	
		}
	}
	$scope.liftownerView = function(){
		$scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		if (!$cookies.get('type')){
			$location.url('/');
		} else if ($cookies.get('type') == 'admin') {
			$location.url('/dashboard/admin');
		} else if ($cookies.get('type') == 'inspector'){
			$location.url('/dashboard/inspector');
		} else {
			//The Correct Path
			$scope.getUserLifts()			
		}
	}
	// END Constructors
	////////////////////////////////////////

	var getAllUsers = function() {
		userFactory.getusers(function(data){
			$scope.allUsers = data;
		})
	}

	$scope.adduser = function(){
		userFactory.adduser($scope.newUser, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.regErrors = data.errors;
			} else {
				$location.path('/')
				$scope.newUser = {}
			}
		})
	}

	$scope.login = function(){
		userFactory.loginuser($scope.userData, function(data){

			if(data.hasOwnProperty('errors')){
				$scope.loginErrors = data.errors;
			} else {
				$cookies.put("name", data['name']);
				$cookies.put("id", data['_id']);
				$cookies.put("type", data['type']);

				UserService = data;

				if (data.type == 'admin') {
					$location.url('/dashboard/admin');
				}else if (data.type == 'lift_owner'){
					$location.url('/dashboard/liftowner');	
				}else if (data.type == 'inspector'){
					$location.url('/dashboard/inspector');	
				} 
			}
		})
	}

	$scope.checkLogin = function(){
		userFactory.checkLogin(function(data){
			console.log("THIS IS CHECK LOG IN");
			console.log(data);
			if (!data._id){
				console.log("LOGGED OUT")
				$scope.logout();
			}
		})
	}

	$scope.logout = function(){
		$cookies.remove('name');
		$cookies.remove('id');
		$cookies.remove('type');
		$scope = {}
		$location.url('/');	
	}

	$scope.getInspections = function(){
		userFactory.getInspections(function(data){
			if (data.errors) {
				console.log("THERE WERE ERRORS GETTING INSPECTIONS")
				// console.log(data.errors)
			} else {
				console.log("You super got the inspections bro")
				$scope.inspections = data;
				console.log($scope.inspections)
			}

		})
	}

		$scope.getUserLifts = function(){
		userFactory.getUserLifts(function(data){
			if (data.errors) {
				console.log("THERE WERE ERRORS GETTING INSPECTIONS")
				// console.log(data.errors)
			} else {
				console.log("You super got the lifts bro")
				$scope.lifts = data;
				console.log($scope.lifts)
			}

		})
	}


});