angular.module('worldHotel')
.controller('listHotelController',listHotelController);

function listHotelController(dataFactory){
	var vm =  this;
dataFactory.listHotelController().then(function(res){
	vm.hotels = res;
})
	vm.title = 'WORLD HOTELS';
}