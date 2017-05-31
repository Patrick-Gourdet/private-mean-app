angular.module('worldHotel').factory('dataFactory',dataFactory);


function dataFactory($http){

	return {
		listHotelController: listHotelController,
		displayHotelController: displayHotelController
	};


	function listHotelController(){
		return $http.get('/api/hotels').then(complete).catch(failed);
	}
	function displayHotelController(id){
			console.log(id);
		return $http.get('/api/hotels/' + id).then(complete).catch(failed);
	}
	function complete(res){
		return res.data;
	}
	function failed(err){
		return err.statusText;
	}

}