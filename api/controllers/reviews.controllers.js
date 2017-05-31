var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var validate = require('validator');

module.exports.reviewsGetAll = function(req,res){
	var hotelId = req.params.hotelId;
	console.log('Reviews Get All');

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err,doc){
			res
			   .status(200)
			   .json(doc.reviews);

		});
};

module.exports.reviewsGetOne = function(req,res){
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var testID = validate.isMongoId(hotelId);
	var testID2 = validate.isMongoId(reviewId);
	console.log('Get One Review ID ' + reviewId + " for Hotel " + hotelId);
	if(!testID || !testID2){
		console.log('Error in mongoID');

			res
				.status(404)
				.json({
					"message" : "There are no reviews on this hotel"
				});
				return;
	}else{
			Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err,doc){
			if(err){
				console.log('Error in find one Review');
							res
			  .status(404)
			  .json({
			  	"message" : "There are no reviews to be displayed"
			  });
				return;
			}
			var review = doc.reviews.id(reviewId);
			res
			  .status(200)
			  .json(review);
		});
	}


};
var _addReview = function(req,res,hotel){

	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating,10),
		review : req.body.review
	});

	hotel.save(function(err,hotelUpdated){
		if(err){
			res
				.status(200)
				.json(err)
		}else{
			res
				.status(202)
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
		}
	});

};
module.exports.reviewsAddOne = function(req,res){
	var hotelId = req.params.hotelId;

	var testID = validate.isMongoId(hotelId);
			var responce = {
				status  : 200,
				message : []
			};
	console.log('Get One Review ID '  + hotelId);
	if(!testID ){
		console.log('Error in mongoID');

			res
				.status(400)
				.json({
					"message" : "There are no reviews on this hotel"
				});
				return;
	}else{
		Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err,doc){

			if(err){
				console.log('Error in find one Review');
				responce.status = 500;
				responce.message = err;
			}else if(!doc){
				responce.status = 404;	
			  	responce.message = {
			  	"message" : "There are no reviews to be displayed"
			  };
			}
			if(doc){
				_addReview(req,res,doc);
			}else{
				res
			  .status(responce.status)
			  .json(responce.message);
			}
			
		});
	}
			
};
module.exports.reviewsUpdateOne = function(req,res){
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("In update review for hotel " + hotelId + " Review Id is " + reviewId);

	var testID = validate.isMongoId(hotelId);
	var testID2 = validate.isMongoId(reviewId);
	console.log('Get One Review ID ' + reviewId + " for Hotel " + hotelId);
	if(!testID || !testID2){
		console.log('Error in mongoID');

			res
				.status(404)
				.json({
					"message" : "There are no reviews on this hotel"
				});
				return;
	}else{
	Hotel
		.findById(hotelId)
		.exec(function(err,doc){
			var thisReview;
			var responce = {
				status : 200,
				message : doc
			};
			if(err){
				console.log('Error in find one Review');
					responce.status = 500;
			  		responce.message = err;
				
			}else if(!doc){
					responce.status = 404;
			  		responce.message = {
			  			"message" : "There are no reviews to be displayed"
			  			};

			}else{
				thisReview = doc.reviews.id(reviewId); 
				        // If the review doesn't exist Mongoose returns null
			    if (!thisReview) {
			        response.status = 404;
			         response.message = {
			          "message" : "Review ID not found " + reviewId
			         };
       			 }

			}
			if(responce.status !== 200){
					res
						.status(responce.status)
						.json(responce.message);
			}else{

					thisReview.name = req.body.name;
					thisReview.rateing = parseInt(req.body.rateing,10);
					thisReview.review = req.body.review;


			doc.save(function(err,hotelUpdated){
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
	}

};

module.exports.reviewsDeleteOne = function(req,res){
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("In update review for hotel " + hotelId + " Review Id is " + reviewId);

	var testID = validate.isMongoId(hotelId);
	var testID2 = validate.isMongoId(reviewId);
	console.log('Get One Review ID ' + reviewId + " for Hotel " + hotelId);
	if(!testID || !testID2){
		console.log('Error in mongoID');

			res
				.status(404)
				.json({
					"message" : "There are no reviews on this hotel"
				});
				return;
	}else{
	Hotel
		.findById(hotelId)
		.exec(function(err,doc){
			var thisReview;
			var responce = {
				status : 200,
				message : doc
			};
			if(err){
				console.log('Error in find one Review');
					responce.status = 500;
			  		responce.message = err;
				
			}else if(!doc){
					responce.status = 404;
			  		responce.message = {
			  			"message" : "There are no reviews to be displayed"
			  			};

			}else{
				thisReview = doc.reviews.id(reviewId); 
				        // If the review doesn't exist Mongoose returns null
			    if (!thisReview) {
			        response.status = 404;
			        response.message = {
			          "message" : "Review ID not found " + reviewId
			         };
       			 }
			}
			if(responce.status !== 200){
					res
						.status(responce.status)
						.json(responce.message);
			}else{

			doc.reviews.id(reviewId).remove();
			doc.save(function(err,hotelUpdated){
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
	}


	};