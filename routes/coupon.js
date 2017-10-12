var express = require('express');
var router = express.Router();
var Coupon = require('../models/coupon');
var couponDB = require('../database/couponDB');
var iosCouponGenerator = require('../services/iosCouponGenerator');
var pdfCouponGenerator = require('../services/pdfCouponGenerator');
var logger = require('../global/logger');
var async = require('async');
var faucet = require('../database/faucetDB');
router.isObject =  function isObject(a) {
    return (!!a) && (a.constructor === Object);
}
router.post('/', function(req, res, next) {
    var name = "";
    if (req.body && router.isObject(req.body) && req.body.name) {
        name = req.body.name;
    }

    faucet.getAndDeleteKey(function (err,row) {
        console.log(row);
        if(err){
            res.sendStatus(500);
        }else{
            var coupon = new Coupon(row.key,row.value,name);
            couponDB.addCoupon(coupon);
            res.send(coupon.id);
        }



    })

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
    var coupon = couponDB.getCoupon(req.params['id']);
    if (typeof  coupon !== 'undefined') {
        pdfCouponGenerator.generateCoupon(coupon,res, error =>{
            res.send(error);
        })
    }else{
        res.sendStatus(404);
    }
});


router.post('/addCouponKeys', function(req,res,next){
    if(req.body && Array.isArray(req.body) && req.body.length > 0){
        async.eachSeries(req.body,function (pair,callback){
            faucet.addKey(pair.key,pair.value,callback);
        }, function(err){
            if(err){
                res.sendStatus(500);
            }else{
                res.sendStatus(201);
            }
        })
    }

});


module.exports = router;
