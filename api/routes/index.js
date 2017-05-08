var express = require('express');
var router = express.Router();
var ctrlHotel = require('../controllers/hotels.controllers.js');
router
.route('/hotels')
.get(ctrlHotel.hotelsGetAll);

router
.route('/hotels/:hotelId')
.get(ctrlHotel.hotelsGetOne);

router
	.route('/hotels/new')
	.post(ctrlHotel.hotelsAddOne);

module.exports = router;