var app = angular.module('myApp', ['ngAnimate'])
    .animation('.fade', function () {
        return {
            enter: function (element, done) {
                element.css('display', 'none');
                $(element).fadeIn(1000, function () {
                    done();
                });
            },
            leave: function (element, done) {
                $(element).fadeOut(1000, function () {
                    done();
                });
            },
            move: function (element, done) {
                element.css('display', 'none');
                $(element).slideDown(500, function () {
                    done();
                });
            }
        }
    })
    .controller('ItemCtrl', function ($scope) {
        $scope.items = [
            { name: "Vessel" },
            { name: "Booty" },
            { name: "Loot" },
            { name: "Pipe" },
            { name: "Treasure" },
            { name: "Arrgh" }
        ];
        $scope.addItem = function () {
            $scope.items.push($scope.item);
            $scope.item = {};
        };
        $scope.removeItem = function (index) {
            $scope.items.splice(index, 1);
        };
        $scope.bottomToTop = function () {
            $scope.items.unshift($scope.items.pop());
        };
    });