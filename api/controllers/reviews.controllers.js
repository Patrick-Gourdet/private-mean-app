var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req,res){
	var hotelId = req.params.hotelId;
	console.log('Reviews Get All');

	Hotel
		.findById(hotelId)
		.exec(function(err,doc){
			res
			   .status(200)
			   .json(doc.reviews);

		});
};

module.exports.reviewsGetOne = function(req,res){
	var hotelId = req.params.hotelId;
	console.log('Get One Review');

	Hotel
		.findById(hotelId)
		.exec(function(err,doc){
			if(err){
				console.log('Error in find one Review');
				return;
			}
			res
			  .status(200)
			  .json(doc.reviws.reviewId);
		})

};