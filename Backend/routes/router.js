const express = require('express');
const router = express.Router();
const {checkOut,paymentVerification} = require('../controllers/payment');

router.route('/checkout').post(checkOut)
router.route('/paymentverification').post(paymentVerification);

module.exports = router;