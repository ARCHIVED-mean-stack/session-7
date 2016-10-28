angular.module('myApp', ['ngAnimate']).
    controller('ItemCtrl', function ($scope) {
        $scope.items = [
            { name: "Vessel" },
            { name: "Booty" },
            { name: "Loot" },
            { name: "Pipe" },
            { name: "Treasure" },
            { name: "Arrgh" }
        ];
        $scope.removeItem = function (index) {
            $scope.items.splice(index, 1);
        }
        $scope.addItem = function () {
            $scope.items.push($scope.item);
            $scope.item = {};
        }
        $scope.bottomToTop = function () {
            $scope.items.unshift($scope.items.pop());
        }
    });