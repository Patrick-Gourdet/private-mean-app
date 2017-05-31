angular.module('worldHotel', ['ngRoute'])
.config(config);

function config($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'interface-app/list-hotels/hotel-list.html',
		controller: listHotelController,
		controllerAs: 'vm'
	}).when('/hotels/:id',{
		templateUrl: 'interface-app/display-hotel/hotel-display.html',
		controller: displayHotelController,
		controllerAs: 'vm'
	});
}

