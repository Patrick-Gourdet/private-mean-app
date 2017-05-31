var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost:27017/meanHotel';


 

mongoose.connect(dbURL);

mongoose.connection.on('connected',function(){
	console.log('Mongoose connected to ' + dbURL );
});
mongoose.connection.on('disconnected',function(){
	console.log('Mongoose has disconnected');
});
mongoose.connection.on('error',function(err){
	console.log('Mongoose not connected ' + err );
});

process.on('SIGINT',function(){
	mongoose.connection.close(function(){
		console.log('Mongoose has terminated on (SIGINT');
		process.exit(0);
	});
});

process.on('SIGTERM',function(){
	mongoose.connection.close(function(){
		console.log('Mongoose has terminated on (SIGTERM)');
		process.exit(0);
	});
});

process.on('SIGUSR2',function(){
	mongoose.connection.close(function(){
		console.log('Mongoose has terminated on (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

require('./hotel.modules.js');