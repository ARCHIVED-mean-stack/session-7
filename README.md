#MEAN Session Seven

http://daniel.deverell.com/mean-fall-2016/ng-animate-sample/#/

The inspiration for this was taken from this [collection of page transitions](http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/).


##Animation

###Simple CSS Animation

Using `:hover` and the transition property.

```html
<!doctype html>
<html>

<head>
	<title>CSS Transitions</title>
	<style>
		.box {
			margin: 50px auto;
			background: #5FCF80;
			width: 150px;
			height: 150px;
			transition: all 2s ease-in-out;
		}

		.box:hover {
			background: #9351A6;
			border-radius: 50%;
			width: 150px;
			height: 150px;
			transform: rotate(360deg);
			transition: all 1s ease-in-out;
		}
	</style>
</head>

<body>
	<div class="container">
		<div class="box"></div>
	</div>
</body>
</html>
```

###Angular CSS Animation

Instead of doing a transition on :hover, we create animation by binding transitions to a class, `.rotate`, and create a class for both the "box" and "circle" states of the div. 

This enables us to switch between classes using the ng-class directive built into Angular (part of core ng).

```html
	<div>
		<input type="checkbox">
		<div class="rotate">
		</div>
	</div>
```

```css
.box {
	margin: 50px auto;
	background: #5FCF80;
	width: 150px;
	height: 150px;
}

.circle {
	background: #9351a6;
	border-radius: 50%;
	margin: 20px auto;
	width: 150px;
	height: 150px;
	transform: rotate(360deg);
}

.rotate {
	transition: all 2s linear;
}
```

Note: you can change the class in the inspector to see the animation.


```html
	<div ng-app="myApp" ng-controller="MainCtrl">
		<input type="checkbox" ng-model="boxClass">
		<div class="rotate" ng-class="{'box': boxClass, 'circle': !boxClass}">
		</div>
	</div>
```


```js
angular.module('myApp', [])
.controller('MainCtrl', function($scope){
	$scope.boxClass = true;
});
```

Note - for brevity we are not creating components. 

bind the boolean value that is attached to $scope.boxClass to whether or not the element should have the .box or .circle class


Checked (default) - boxClass is true and `box` is inserted into the class statement:

```html
<div class="box rotate" ng-class="{'box': boxClass, 'circle': !boxClass} "></div>
```

Unchecked:

```html
<div class="rotate circle" ng-class="{'box': boxClass, 'circle': !boxClass} "></div>
```

###Angular Animation with ngAnimate

$animate is a service that supports directives built into Angular that allow us to create animations using CSS. 

Once you include ngAnimate in your module, there is a change in how Angular handles certain built-in directives. Angular will hook into and monitor these directives and add special classes to the element on the firing of certain events. 

For example, when you add, move, or remove an item from an array which is being used by the ngRepeat directive, Angular will catch that event and add a series of classes to the element in the ngRepeat.

The attached CSS classes take the form of ng-{EVENT} and ng-{EVENT}-active for structural events like enter, move, or leave. But, for class-based animations, it takes the form of {CLASS}-add, {CLASS}-add-active, {CLASS}-remove, and {CLASS}-remove-active. 

Here's [documentation with a table](https://docs.angularjs.org/api/ngAnimate) that illustrate some of the built-in directives, the events that fire, and classes that are temporarily added when you add ngAnimate to your project.
￼
Angular will automatically detect that CSS is attached to an animation when the animation is triggered, and add the .ng-{EVENT}-active class until the animation has run its course. It will then remove that class, and any other added classes, from the DOM.

Build an example of using CSS3 transitions to animate a ngRepeat directive:

```html
<div>
	<h1>Pirate Day</h1>
	<ul>
		<li class="fade">
			{{ item.name }}
			<span>X</span>
		</li>
	</ul>
	<input type="text">
</div>
```

```js
angular.module('myApp', ['ngAnimate']).
	controller('ItemCtrl', function($scope){
		$scope.items = [
		{name: "Vessel"},
		{name: "Booty"},
		{name: "Loot"},
		{name: "Pipe"},
		{name: "Treasure"},
		{name: "Arrgh"}
		];
		$scope.removeItem = function(index) {
			$scope.items.splice(index, 1);
		}
	});
```
$index captures the iteration of the ng-repeat you’re. Here we send it to our function in the controller.

```html
<div ng-app="myApp" ng-controller="ItemCtrl">
	<h1>Pirate Day</h1>
	<ul>
		<li ng-repeat="item in items" class="fade">
			{{ item.name }}
			<span ng-click="removeItem($index)">X</span>
		</li>
	</ul>
</div>
```

JS

`<script src="js/app.js"></script>`

Add:

```css
.fade {
    transition: all .2s linear;
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

Add Item Button

```html
...
<input type="text" ng-model="item.name" />
<button ng-click="addItem()">Add Item</button>
...
```

and code

```js
$scope.addItem = function() {
    $scope.items.push($scope.item);
    $scope.item = {};
  };
```

Push() appends elements to the end of the given array. When push() takes multiple arguments they are appended in a left-to-right order.

```js
var data = [ "X" ];
data.push( "A" );
data.push( "B", "C" );
console.log( data );
["X", "A", "B", "C"]

```

###Create and Implement Component

app.module.js on top level

`angular.module('myApp', ['manageList', 'ngAnimate']);`

manage-list.module.js in a new manage-list directory

`angular.module('manageList', []);`

manage-list.template.html

```html
<h1>Pirate Day</h1>
<ul>
	<li ng-repeat="item in $ctrl.items" class="fade">
		{{ item.name }}
		<span ng-click="$ctrl.removeItem($index)">X</span>
	</li>
</ul>

<input type="text" ng-model="$ctrl.item.name" />
<button ng-click="$ctrl.addItem()">Add Item</button>
```

manage-list.component.js 

```js
angular.module('myApp').component('manageList', {

	templateUrl: 'manage-list/manage-list.template.html',

	controller: function ItemCtrl() {

		var self = this;
		self.items = [
			{ name: "Vessel" },
			{ name: "Booty" },
			{ name: "Loot" },
			{ name: "Pipe" },
			{ name: "Treasure" },
			{ name: "Arrgh" }
		];
		self.removeItem = function (index) {
			self.items.splice(index, 1);
		}
		self.addItem = function () {
			self.items.push(self.item);
			self.item = {};
		}
	}
});
```

Finally, in index.html

```
<div ng-app="myApp">
	<manage-list></manage-list>
</div>
```

###Angular CSS Animation

* same JS as previous example
* Same HTML as previous example

CSS3 animations are more complicated than transitions, but have the same implementation on the ngAnimate side. In the CSS we use an @keyframes rule to define our animation. This is the same that as our earlier transition except we use the animation keyword in our CSS and give the animation a name:

```css
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


```html
    <button ng-click="bottomToTop()">Move Bottom Item to Top</button>
```

```js
$scope.bottomToTop = function() {
  $scope.items.unshift($scope.items.pop());
};
```

The pop() method pulls the last element off of the given array and returns it. This alters the array on which the method was called.


###JavaScript animations (uses jQuery)

Note - this is included for reference only. Since modern brwsers have sufficient support for css animations it is no longer necessary to perform js animations in most cases. If you are targeting modern browsers, then this won't be an issue, but if you need to support browsers that do not support CSS transitions, then you can easily register a JavaScript animation with Angular.

When you include ngAnimate as a dependency of your Angular module, it adds the animation method to the module. You can now use it to register your JavaScript animations and tap into Angular hooks in built-in directives like ngRepeat. This method takes two arguments: className(string) and animationFunction(function).

The className parameter is the class that you are targeting, and the animation function can be an anonymous function that will receive both the element and done parameters when it is called. The element parameter is just that, the element as a jqLite object, and the done parameter is a function that you need to call when your animation is finished running so that angular can continue on it's way and knows to trigger that the event has been completed.

The main thing to grasp is what needs to be returned from the animation function. Angular is going to be looking for an object to be returned with keys that match the names of the events that you want to trigger animations on for that particular directive.

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

```js
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
```

We can get rid of any CSS we previously had on the .fade class, but we still need some kind of class to register the animation on. So, for continuity's sake we use the .fade class.

Basically, what happens here is that Angular will register your animation functions and call them on that specific element when that event takes place on that directive. For example, it will call your enter animation function when a new item enters an ngRepeat.


##Angular Animation and Routing

While the example may seem of limited use, this form of animation is important for modern interface design - especially on devices such as phones.

```html
<!DOCTYPE html>
<html ng-app="helloWorldApp">
<head>
	<title>Class Review</title>
	<script src="https://code.angularjs.org/1.5.8/angular.js"></script>       
	<script src="https://code.angularjs.org/1.5.8/angular-route.js"></script>
	<script src="https://code.angularjs.org/1.5.8/angular-animate.js"></script>

</head>
<body>
	
</body>
</html> 
```

Develop the app.js file.

```js
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
```

Link it:

`<script src="js/app.js"></script>`

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

Link it
`<script src="js/controllers.js"></script>`


###Page Class

Add the page class directive and examine the HTML in inspector

```html
<div class="page {{ pageClass }}" ng-view></div>
```


Inject ngAnimate into the module

```js
var helloWorldApp = angular.module('helloWorldApp', [
    'ngRoute',   
    'ngAnimate', 
    'helloWorldControllers' 
]);
```

[ngAnimate](http://docs.angularjs.org/api/ngAnimate) - adds and removes CSS classes to different Angular directives based on if they are entering or leaving the view. For example, when we load up a site, whatever is populated in ng-view gets a .ng-enter class.

ngAnimate Works On: ngRepeat, ngInclude, ngIf, ngSwitch, ngShow, ngHide, ngView, and ngClass

Examine animation.css


```
<link rel="stylesheet" type="text/css" href="animation.css">
```

* make our pages be full width and full height
* positioned absolutely so that the pages can overlap each other as they enter and leave
* each page will have their very own ng-enter and ng-leave animation

```css
/* chained to use leave and enter events  */

.page.ng-leave  { z-index:9999; }
.page.ng-enter  { z-index:8888; }

/* page specific animations */

/* 1 home */
.page-home.ng-leave         {
    transform-origin: 0% 0%;
    animation: rotateFall 1s both ease-in;
}
.page-home.ng-enter         {  
    animation:scaleUp 0.5s both ease-in;    
}

/* 2 about */
.page-about.ng-leave        {
    animation:slideOutLeft 0.5s both ease-in;   
}
.page-about.ng-enter        {  
    animation:slideInRight 0.5s both ease-in;    
}

/* 3 404 */
.page-404.ng-leave      {
    transform-origin: 50% 50%;
    animation: rotateOutNewspaper .5s both ease-in;
}
.page-404.ng-enter      { 
    animation:slideInUp 0.5s both ease-in;  
}

/* leaving animations - rotate and fall */
@keyframes rotateFall {
    0% { transform: rotateZ(0deg); }
    20% { transform: rotateZ(10deg); animation-timing-function: ease-out; }
    40% { transform: rotateZ(17deg); }
    60% { transform: rotateZ(16deg); }
    100% { transform: translateY(100%) rotateZ(17deg); }
}

/* entering animations - scale up */
@keyframes scaleUp {
    from        { opacity: 0.3; transform: scale(0.8); }
}

/* slide in from the right */
@keyframes slideInRight {
    from    { transform:translateX(100%); }
    to      { transform: translateX(0); }
}

/* slide in from the bottom */
@keyframes slideInUp {
    from    { transform:translateY(100%); }
    to      { transform: translateY(0); }
}

/* slide out */
@keyframes slideOutLeft {
    to      { transform: translateX(-100%); }
}

/* rotate out */
@keyframes rotateOutNewspaper {
    to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
}

```









##Homework




##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 5. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.



