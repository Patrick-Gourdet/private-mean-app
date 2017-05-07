module.exports.foodsGetAll = function(req,res){
console.log('In food controller Get JSON');

	res
	.status(200)
	.json({"jsonFood": "Good Food"});
};