#MEAN Session Seven


```html
<!DOCTYPE html>
<html lang="en" ng-app="helloWorldApp">
<head>
    <title>Class Review</title>
    
    <script src="js/libs/angular.min.js"></script>        
    <script src="js/libs/angular-route.min.js"></script> 

    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script> 

</head>
<body>
    <div ng-view></div>
</body> 
</html> 
```

Develop the app.js file.

```js
var helloWorldApp = angular.module('helloWorldApp', 
    [
    'ngRoute',   
    'helloWorldControllers' 
    ]);

helloWorldApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        }).when('/show', {
            templateUrl: 'partials/show.html',
            controller: 'ShowCtrl'
        }).otherwise({ 
            templateUrl: 'partials/404.html',
            controller: 'FourCtrl'
        });
    }]);
```

Develop the controller

```js
var helloWorldControllers = angular.module('helloWorldControllers', []);

helloWorldControllers.controller('MainCtrl', ['$scope',
    function MainCtrl($scope) {
        $scope.pageClass = 'page-home';
        $scope.message = "Hello World";
    }]);

helloWorldControllers.controller('ShowCtrl', ['$scope',
    function ShowCtrl($scope) {
        $scope.pageClass = 'page-about';
        $scope.message = "Show The World";
    }]);

helloWorldControllers.controller('FourCtrl', ['$scope',
    function FourCtrl($scope) {
        $scope.pageClass = 'page-404';
        $scope.message = "404 - you are lost!";
    }]);
```

[Animation Ideas](http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/)

Page Class

Add the page class directive and examine the HTML in inspector

```html
<div class="page {{ pageClass }}" ng-view></div>
```

Add the angular animate script

```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.7/angular-animate.js"></script>
```

Inject ngAnimate into the module

```js
var helloWorldApp = angular.module('helloWorldApp', [
    'ngRoute',   
    'ngAnimate', 
    'helloWorldControllers' 
]);
```

ngAnimate - adds and removes CSS classes to different Angular directives based on if they are entering or leaving the view. For example, when we load up a site, whatever is populated in ng-view gets a .ng-enter class.

ngAnimate Works On: ngRepeat, ngInclude, ngIf, ngSwitch, ngShow, ngHide, ngView, and ngClass

http://docs.angularjs.org/api/ngAnimate

Examine animation.css

- make our pages be full width and full height

positioned absolutely so that the pages can overlap each other as they enter and leave

6 different animations - each page will have their very own ng-enter and ng-leave animation
Move it to the working directory and link it

```
<link rel="stylesheet" type="text/css" href="animation.css">
```

Simple CSS Animation (preview only)

uses :hover

Angular Animation 2

```html
<div ng-app="myApp" ng-controller="MainCtrl">
  <div class="container">
    <input type="checkbox" ng-model="boxClass" />
    <div class="box rotate" ng-class="{'box': boxClass, 'circle': !boxClass} "></div>
  </div>
</div>
```

CSS

Instead of doing a transition on :hover, we can create animation by binding transitions to one class, .rotate, and create a class for both the "box" and "circle" states of the div. This enables us to switch between classes using the ng-class directive built into Angular.

```css
.box {
  margin: 20px auto;
  background: #5FCF80;
  width: 150px;
  height: 150px;
}
.circle {
  transform: rotate(360deg);
  background: #9351A6;
  border-radius: 50%;
  margin: 20px auto;
  width: 150px;
  height: 150px;
}
.rotate {
transition: all 1s ease-in-out;
}
```

JS

bind the boolean value that is attached to $scope.boxClass to whether or not the element should have the .box or .circle class

```js
<script>
angular.module('myApp', [])
.controller('MainCtrl', function($scope) {
    $scope.boxClass = true;
});
</script>
```

Checked:

```html
<div class="box rotate" ng-class="{'box': boxClass, 'circle': !boxClass} "></div>
```

Unchecked:

```html
<div class="rotate circle" ng-class="{'box': boxClass, 'circle': !boxClass} "></div>
```

Angular Animation 3 - CSS3 Transitions

The $animate service supports directives that are built into Angular. This is available without any other configuration, and allows us to create animations for our directives in plain CSS. To use animations in this way, you do not even need to include $animate in your controller; just include ngAnimate as a dependency of your Angular module.

Once you include ngAnimate in your module, there is a change in how Angular handles certain built-in directives. Angular will begin to hook into and monitor these directives, and add special classes to the element on the firing of certain events. For example, when you add, move, or remove an item from an array which is being used by the ngRepeat directive, Angular will now catch that event, and add a series of classes to that element in the ngRepeat.

The attached CSS classes take the form of ng-{EVENT} and ng-{EVENT}-active for structural events like enter, move, or leave. But, for class-based animations, it takes the form of {CLASS}-add, {CLASS}-add-active, {CLASS}-remove, and {CLASS}-remove-active. The exceptions to these rules are ng-hide and ng-show. Both of these directives have add and remove events that are triggered, just like ng-class, but they both share the .ng-hide class, which is either added or removed when appropriate. You will also see ngAnimate add a .ng-animate class to some of these directives on animation.

A table that illustrates some of the built-in directives, the events that fire, and classes that are temporarily added when you add ngAnimate to your project:
￼
Angular will automatically detect that CSS is attached to an animation when the animation is triggered, and add the .ng-{EVENT}-active class until the animation has run its course. It will then remove that class, and any other added classes, from the DOM.

Build an example of using CSS3 transitions to animate a ngRepeat directive

```html
<div class="container" ng-app="myApp"  ng-controller="ItemCtrl">
<div class="row">
  <div class="one-half column offset-by-three">
    <h1 class="text-center">Portfolios</h1>
    <ul>
      <li ng-repeat="item in items" class="fade">
        {{item.name}}
        <span ng-click="removeItem($index)">X</span>
      </li>
    </ul>
  </div>
</div>
</div>
```
CSS

```css
.text-center {
	text-align: center;
}
li span {
	float: right;
	cursor: pointer;
}
.fade {
	transition: 1s linear all;
	-webkit-transition: 1s linear all;
}
.fade.ng-enter {
	opacity: 0;
}
.fade.ng-enter.ng-enter-active {
	opacity: 1;
}
.fade.ng-leave {
	opacity: 1;
}
.fade.ng-leave.ng-leave-active {
	opacity: 0;
}
```

JS

```js
angular.module('myApp', ['ngAnimate'])
.controller('ItemCtrl', function($scope) {
  $scope.items = [
  {name: "Vessel"},
  {name: "Booty"},
  {name: "Loot"},
  {name: "Pipe"},
  {name: "Treasure"}
  ];
  $scope.addItem = function() {
    $scope.items.push($scope.item);
    $scope.item = {};
  };
  $scope.removeItem = function(index) {
    $scope.items.splice(index, 1);
  };
});
```

Add Item Button

```html
<div class="row">
  <div class="one-half column offset-by-three">
    <input type="text" ng-model="item.name" />
    <button class="button-primary" ng-click="addItem()">Add Item</button>
  </div>
</div> 
```

and code

```js
$scope.addItem = function() {
    $scope.items.push($scope.item);
    $scope.item = {};
  };
```

Angular Animate 4 - CSS3 Animations (the code here needs vendor prefixes)

same JS as previous example:

```js
angular.module('myApp', ['ngAnimate'])
.controller('ItemCtrl', function($scope) {
  $scope.items = [
 {name: "Vessel"},
  {name: "Booty"},
  {name: "Loot"},
  {name: "Pipe"},
  {name: "Treasure"}
  ];
  $scope.addItem = function() {
    $scope.items.push($scope.item);
    $scope.item = {};
  };
  $scope.removeItem = function(index) {
    $scope.items.splice(index, 1);
  };
});
```

CSS3 animations are more complicated than transitions, but have much of the same implementation on the ngAnimate side. However, in the CSS we use an @keyframes rule to define our animation. This is the same that we did our basic transition earlier, except we use the animation keyword in our CSS and give the animation a name:

```css
.text-center {
  text-align: center;
}
li span {
  float: right;
  cursor: pointer;
}
.fade.ng-enter {
  animation: 2s appear;
}
.fade.ng-leave {
  animation: 1s disappear;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

HTML - no change from version 3

```html
<div class="container" ng-app="myApp"  ng-controller="ItemCtrl">
  <div class="row">
    <div class="one-half column offset-by-three">
      <h1 class="text-center">Portfolios</h1>
      <ul>
        <li ng-repeat="item in items" class="fade">
          {{item.name}}
          <span ng-click="removeItem($index)">X</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="one-half column offset-by-three">
      <input type="text" ng-model="item.name" />
      <button class="button-primary" ng-click="addItem()">Add Item</button>
    </div>
  </div>
</div>
```

add move to top (see http://www.bennadel.com/?site-photo=414 for explanations of unshift, pop, etc.)

```html
<div class="row">
  <div class="one-half column offset-by-three">
    <button ng-click="bottomToTop()">Move Bottom Item to Top</button>
  </div>
</div>
```

$scope.bottomToTop = function() {
  $scope.items.unshift($scope.items.pop());
};


5 JavaScript animations (demo only, note: uses jQuery)

JavaScript animation has one major advantage—JavaScript is everywhere, and it has a wider acceptance than some advanced CSS3 animations. Now, if you are just targeting modern browsers, then this probably won't be an issue for you, but if you need to support browsers that do not support CSS transitions, then you can easily register a JavaScript animation with Angular and use it over and over in your directives. Basically, JavaScript has more support in older browsers, and therefore, so do JavaScript animations.

When you include ngAnimate as a dependency of your Angular module, it adds the animation method to the module API. What this means is that you can now use it to register your JavaScript animations and tap into Angular hooks in built-in directives like ngRepeat. This method takes two arguments: className(string) and animationFunction(function).

The className parameter is simply the class that you are targeting, and the animation function can be an anonymous function that will receive both the element and done parameters when it is called. The element parameter is just that, the element as a jqLite object, and the done parameter is a function that you need to call when your animation is finished running so that angular can continue on it's way and knows to trigger that the event has been completed.

The main thing to grasp here however, is what needs to be returned from the animation function. Angular is going to be looking for an object to be returned with keys that match the names of the events that you want to trigger animations on for that particular directive.

Our ngRepeat example, it would look something like this:

return {
  enter: function(element, done) {
    // Animation code goes here
    // Use done() in your animation callback
  },
  move: function(element, done) {
    // Animation code goes here
    // Use done() in your animation callback
  },
  leave: function(element, done) {
    // Animation code goes here
    // Use done() in your animation callback
  }
}

Worth noting that ngRepeat will automatically add the new item to the DOM when it is added to the array, and that said item will be immediately visible. So, if you are trying to achieve a fade in effect with JavaScript, then you need to set the display to none immediately before you fade it in. This is something you could avoid with CSS animations and transitions.


var app = angular.module('myApp', ['ngAnimate'])
.animation('.fade', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      $(element).fadeIn(1000, function() {
        done();
      });
    },
    leave: function(element, done) {
      $(element).fadeOut(1000, function() {
        done();
      });
    },
    move: function(element, done) {
      element.css('display', 'none');
      $(element).slideDown(500, function() {
        done();
      });
    }
  }
})


We can get rid of any CSS we previously had on the .fade class, but we still need some kind of class to register the animation on. So, for continuity's sake we use the .fade class.

Basically, what happens here is that Angular will register your animation functions and call them on that specific element when that event takes place on that directive. For example, it will call your enter animation function when a new item enters an ngRepeat.









##Homework




##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 5. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.



