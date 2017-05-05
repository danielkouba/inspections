var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMessages', 'ngMaterial', 'md.data.table', 'ngFileUpload', 'mdSteppers']);

myApp.config(function($httpProvider, $routeProvider,$locationProvider, $mdThemingProvider){
	
	$locationProvider.hashPrefix('');

	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('blue');
	
	
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
	.otherwise({
		redirectTo: '/'
	})
})