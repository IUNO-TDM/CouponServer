var express = require('express');
var router = express.Router();
var Coupon = require('../models/coupon');
var couponDB = require('../database/couponDB');
var iosCouponGenerator = require('../services/iosCouponGenerator');

router.isObject =  function isObject(a) {
    return (!!a) && (a.constructor === Object);
}
router.post('/', function(req, res, next) {
    var name = "";
    if (req.body && router.isObject(req.body) && req.body.name) {
        name = req.body.name;
    }

    var coupon = new Coupon('123456789345678934567894567890',name);
    couponDB.addCoupon(coupon);
    res.send(coupon.id);
});

router.get('/:id/iosCoupon', function(req, res, next) {
    var coupon = couponDB.getCoupon(req.params['id']);
    if (typeof  coupon !== 'undefined') {
        iosCouponGenerator.generateCoupon(coupon,res, error =>{
            res.send(error);
        })
    }else{
        res.sendStatus(404);
    }

});

router.get('/:id/pdfCoupon', function(req, res, next) {
    res.send('respond with a resource');
});



module.exports = router;
