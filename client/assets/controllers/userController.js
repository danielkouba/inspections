myApp.controller('userController', function($location, $scope, $cookies, userFactory, UserService, InspectionService){



	$scope.InspectionService = InspectionService;

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
			$scope.getUserLifts();

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
				if (data.resetPassword) {
					$location.url('/passwordchange');
				}else if (data.type == 'admin') {
					$location.url('/dashboard/admin');
				}else if (data.type == 'lift_owner'){
					$location.url('/dashboard/liftowner');	
				}else if (data.type == 'inspector'){
					$location.url('/dashboard/inspector');	
				} 
			}
		})
	}

	$scope.forgotPassword = function(){
		userFactory.forgotPassword($scope.userData, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.loginErrors = data.errors;
			} else {
				$location.url('/')
			}
		})
	}

	$scope.changePassword = function(){
		$scope.userData.email = $cookies.get('id');
		userFactory.changePassword($scope.userData, function(data){
			console.log(data);
			if (data.type == 'admin') {
				$location.url('/dashboard/admin');
			}else if (data.type == 'lift_owner'){
				$location.url('/dashboard/liftowner');	
			}else if (data.type == 'inspector'){
				$location.url('/dashboard/inspector');	
			}
		})
	}

	$scope.checkLogin = function(){
		userFactory.checkLogin(function(data){
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
				$scope.inspections = data;
			}

		})
	}

	$scope.getUserLifts = function(){
		userFactory.getUserLifts(function(data){
			if (data.errors) {
				console.log("THERE WERE ERRORS GETTING LIFTS")
				// console.log(data.errors)
			} else {
				$scope.lifts = data;	
			}

		})
	}

	$scope.editInspection = function(inspection){
		for (key in inspection){
			InspectionService[key] = inspection[key];	
		}
		$location.url("/inspect");
	}


	// var getdate = function(){
	// 	var datenow = new Date();
	// 	var month = (datenow.getMonth() + 1).toString();
	// 	var day = datenow.getDate().toString();
	// 	var year = datenow.getFullYear().toString();

	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return year + "-" + month + "-" + day
	// }


	// $scope.setDate= function(date){
	// 	console.log("In set Date with this data")
	// 	console.log(date)
	// 	var month = (date.getMonth() + 1).toString();
	// 	var day = date.getDate().toString();
	// 	var year = date.getFullYear().toString();
	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return month + "/" + day + "/" + year
	// }

	// $scope.setExpiration = function(date){
	// 	console.log("In set expiration with this data")
	// 	console.log(date)
	// 	var month = (date.getMonth() + 1).toString();
	// 	var day = date.getDate().toString();
	// 	var year = (date.getFullYear()+1).toString();
	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return month + "/" + day + "/" + year
	// }






});