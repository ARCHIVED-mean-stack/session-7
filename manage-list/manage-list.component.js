angular.module('myApp').component('manageList', {

	template:
	`
		<h1>Pirate Day</h1>
		<ul>
			<li ng-repeat="item in $ctrl.items" class="fade">
				{{ item.name }}
				<span ng-click="$ctrl.removeItem($index)">X</span>
			</li>
		</ul>

		<input type="text" ng-model="$ctrl.item.name" />
		<button ng-click="$ctrl.addItem()">Add Item</button>
	`,

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

