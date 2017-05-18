var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');



module.exports.hotelsGetAll = function(req,res){

	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset,10);
	}
	if(req.query && req.query.count){
		count = parseInt(req.query.count,10);
	}
	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err,hotel){
			console.log('In hotel findAll ' + hotel.length );
			res
				.status(200)
				.json(hotel);

		});

};
module.exports.hotelsGetOne = function(req,res){

	var hotelId = req.params.hotelId;

	console.log('In hotelId', hotelId);
	Hotel
		.findById(hotelId)
		.exec(function(err,hotel){
			if(err){
				console.log("Error finding Object");
				return;
			}

			res
			.status(200)
			.json(hotel);
			});

};
module.exports.hotelsAddOne = function(req,res){
	var db = conn.get();
	var collection = db.collection('hotels');
	console.log("Post new hotel");
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};