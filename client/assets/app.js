var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMessages', 'ngMaterial', 'md.data.table', 'ngFileUpload', 'mdSteppers']);

myApp.config(function($httpProvider, $routeProvider,$locationProvider, $mdThemingProvider){
	
	$locationProvider.hashPrefix('');





  // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  var aliBlue = $mdThemingProvider.extendPalette('blue', {
    '500': '#0261a6',
    'contrastDefaultColor': 'light'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('aliBlue', aliBlue);

  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('aliBlue');
	
	// $httpProvider.interceptors.push(function($q, $location){
	// 	return {
	// 		'responseError' : function(rejection){
	// 			if (rejection.status == 401){
	// 				$location.url('/');
	// 			}
	// 			return $q.reject(rejection);
	// 		}
	// 	}
	// });

	$routeProvider
	.when('/', {
		templateUrl: 'assets/partials/login.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/register', {
		templateUrl: 'assets/partials/register.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/login', {
		templateUrl: 'assets/partials/login.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/dashboard/inspector', {
		templateUrl: 'assets/partials/inspectorDashboard.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/dashboard/liftowner', {
		templateUrl: 'assets/partials/liftownerDashboard.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/dashboard/admin', {
		templateUrl: 'assets/partials/adminDashboard.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/inspect', {
		templateUrl: 'assets/partials/form.html',
		controller: 'formController',
		controllerAs: 'FC'
	})
	.when('/addlift', {
		templateUrl: 'assets/partials/addlift.html',
		controller: 'formController',
		controllerAs: 'FC'
	})
	.when('/passwordrecovery', {
		templateUrl: 'assets/partials/forgotPassword.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/passwordchange', {
		templateUrl: 'assets/partials/changePassword.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.otherwise({
		redirectTo: '/'
	})
})