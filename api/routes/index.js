var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/foods.controllers.js');
router
.route('/foods')
.get(ctrlFood.foodsGetAll);

module.exports = router;