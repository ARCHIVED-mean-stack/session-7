var helloWorldApp = angular.module('helloWorldApp', [
	'ngRoute', 
	'ngAnimate', 
	'helloWorldControllers'
	]);

helloWorldApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'templates/main.html',
			controller: 'MainCtrl'
		})
		.when('/show', {
			templateUrl: 'templates/show.html',
			controller: 'ShowCtrl'
		})
		.otherwise({
			templateUrl: 'templates/404.html',
			controller: 'FourCtrl'
		});
	}]);