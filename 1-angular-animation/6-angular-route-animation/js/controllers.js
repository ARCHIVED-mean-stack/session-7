angular.module('helloWorldControllers', []);

angular.module('helloWorldControllers').controller('MainCtrl', ['$scope',
    function MainCtrl($scope) {
        $scope.pageClass = 'page-home';
        $scope.message = "Hello World";
    }]);

angular.module('helloWorldControllers').controller('ShowCtrl', ['$scope',
    function ShowCtrl($scope) {
        $scope.pageClass = 'page-about';
        $scope.message = "Show The World";
    }]);

angular.module('helloWorldControllers').controller('FourCtrl', ['$scope',
    function FourCtrl($scope) {
        $scope.pageClass = 'page-404';
        $scope.message = "404 - you are lost!";
    }]);