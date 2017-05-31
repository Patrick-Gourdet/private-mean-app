var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGoeQuery = function(req,res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	if(isNaN(lng) || isNaN(lat)){
		console.log("Error the coordinates are invalid");
		res
			.status(400)
			.json({
				"message" : "Error the coordinates are invalid"
			});
		return;
	}
	var point = {
		type : "Point",
		coordinates : [lng,lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 2000,
		num : 5
	};

	Hotel
		.geoNear(point,geoOptions, function(err,results,stats){
			if(err){
				console.log("Error in GEO ", err);
				return;
			}

			console.log('Geo Results ', results);
			console.log('Geo Stats ', stats);
			res
			  .status(200)
			  .json(results);
		});
};

module.exports.hotelsGetAll = function(req,res){

	var offset = 0;
	var count = 5;
	var maxCount = 10;
	var maxOffset = 20;

	if(req.query && req.query.lng && req.query.lat){
		runGoeQuery(req,res);
		return;
	}	

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset,10);
	}
	if(req.query && req.query.count){
		count = parseInt(req.query.count,10);
	}
	if(isNaN(offset) || isNaN(count)){
		res
			.status(400)
			.json({
				"message" : "Query sting must pass in numbers to work"
			});
		return;
	}
	if(count > maxCount){
		res
			.status(400)
			.json({
				"message" : "Maximum of possible hotels to be displayed is exceeded"
			});
			return;

	}
	else if(offset > maxOffset){
				res
			.status(400)
			.json({
				"message" : "Maximum of possible hotels to be displayed is exceeded"
			});
			return;
	}
	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err,hotel){
			if(err){
				console.log('Error could not find hotel' );
			res
				.status(500)
				.json(err);
			}
			else{
				console.log('In hotel findAll ' + hotel.length );
			res
				.status(200)
				.json(hotel);
			}


		});

};
module.exports.hotelsGetOne = function(req,res){

	var hotelId = req.params.hotelId;

	console.log('In hotelId', hotelId);
	Hotel
		.findById(hotelId)
		.exec(function(err,hotel){
			var responce = {
				status : 200,
				message : hotel
			};
			if(err){
				console.log("Error finding Hotel");
			responce.status = 500;
			responce.message = err;
			}
			else if(!hotel){
			responce.status = 404;
			responce.message = {
						"message" : "Hotel ID not fond"
					};
			}
			res
			.status(responce.status)
			.json(responce.message);
			});

};

var _splitArray = function(input){
	var output;
	if(input && input.length > 0){
		output = input.split(";");
	}else{
		output = [];
	}
	return output;

};
module.exports.hotelsAddOne = function(req,res){
	Hotel
		.create({
			name: req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars),
			services: _splitArray(req.body.services),
			photos: _splitArray(req.body.photos),
			currency: req.body.currency,
			location: {
				address : req.body.address,
				coordinates: [
				parseFloat(req.body.lng),
				parseFloat(req.body.lat)
				]
			}

		},function(err,hotel){
			if(err){
				console.log("Bad request in add one");
				res
					.status(400)
					.json(err);
			}
			else{
				console.log("Hotel Creted");
				res
					.status(201)
					.json(hotel);
			}
		});

};
module.exports.hotelsUpdateOne = function(req,res){
	var hotelId = req.params.hotelId;
	console.log('In hotelId', hotelId);
		Hotel
		.findById(hotelId)
		.select("-reviews -rooms")
		.exec(function(err,hotel){
			var responce = {
				status : 200,
				message : hotel
			};
			if(err){
				console.log("Error finding Hotel");
			responce.status = 500;
			responce.message = err;
			}
			else if(!hotel){
			responce.status = 404;
			responce.message = {
						"message" : "Hotel ID not fond"
					};
			}
			if(responce.status !== 200){
							res
			.status(responce.status)
			.json(responce.message);
			}else{
				hotel.name = req.body.name;
				hotel.description = req.body.description;
				hotel.stars = parseInt(req.body.stars);
				hotel.services = _splitArray(req.body.services);
				hotel.photos = _splitArray(req.body.photos);
				hotel.currency = req.body.currency;
				hotel.location = {
					address : req.body.address,
					coordinates: [
					parseFloat(req.body.lng),
					parseFloat(req.body.lat)
					]
				};
				hotel.save(function(err,hotelUpdated){
					if(err){
						res
							.status(500)
							.json(err);

					}else{
						res
							.status(204)
							.json();

					}

				});
			}
			});
};
module.exports.hotelsDeleteOne = function(req,res){
	var hotelId = req.params.hotelId;

	hotel
		.findByIdAndRemove(hotelId)
		.exec(function(req,res){
			if(err){
				console.log("Error deleting hotel " + err);

				res
					.status(404)
					.json(err);
			}else{
				console.log("Hotel deleted, id: ", hotelId + " Name " + req.params.name);
				res
					.status(204)
					.json();
			}

		});

	};