angular.module('helloWorldApp', [
	'ngRoute',
	'ngAnimate',
	'helloWorldControllers'
]);

angular.module('helloWorldApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'MainCtrl'
			})
			.when('/show', {
				templateUrl: 'partials/show.html',
				controller: 'ShowCtrl'
			})
			.otherwise({
				templateUrl: 'partials/404.html',
				controller: 'FourCtrl'
			});
	}]);