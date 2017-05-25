app.controller('navController', function($rootScope, $scope, $location, UserService, userFactory){

  $scope.UserService = UserService;
  $scope.currentNavItem = 'page1';
	
  $scope.goto = function(str){
    console.log(str);	
	$location.url("/"+str);
  }
  
  
  $rootScope.$on('loggedin', function () {
  		$scope.UserService = UserService;
	});

	  
	$scope.logout = function(){
		$scope.UserService = '';
		UserFactory.logout(function(data){
			if(data.errors){
				console.log('Could not log out user')
			} else {
				console.log('')
			}
		})
	}
})