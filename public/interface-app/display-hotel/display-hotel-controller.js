angular.module('worldHotel')
.controller('displayHotelController',displayHotelController);


function displayHotelController(dataFactory,$routeParams){
	var vm =  this;
	var id =  $routeParams.id;
	console.log(id);
dataFactory.displayHotelController(id).then(function(res){
	vm.hotel = res;
})
	vm.title = 'WORLD HOTELS';
}