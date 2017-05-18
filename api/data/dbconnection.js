var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanHotel';


var _connection = null;
var open = function(){
MongoClient.connect(dburl, function(err,db){
	if(err){
		console.log("Connection Error");
		return;
	}
	_connection = db;
	console.log("Connection Success");
});

};

var get = function(){

	return _connection;
}

module.exports = {
	open : open,
	get : get
};