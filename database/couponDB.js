var logger = require('../global/logger');
const CONFIG = require("../config/config_loader.js");

var sqlite3 = require('sqlite3').verbose();
var validate = require('uuid-validate');
var Coupon = require('../models/coupon');

let db = new sqlite3.Database(CONFIG.DATABASE_NAME,(err)=>{
    if (err) {
        logger.fatal(err.message);
    }else{
        logger.info('connected to Coupon DB')
    }
});
db.run('CREATE TABLE IF NOT EXISTS codes(key, value)');
db.run('CREATE TABLE IF NOT EXISTS coupons(id PRIMARY KEY, key, value, name, date)');

var couponDB = {};

couponDB.addKey = function(key, value, callback){
    let sql = 'INSERT INTO codes(key,value) VALUES(?,?)';
    var key_regexp = /^[A-Z-a-z0-9]+$/gi;
    var value_regexp = /^[0-9]+(.[0-9]+)?$/gi;
    if(!key.match(key_regexp)){
        var e = new Error("Key has wrong format");
        callback(e);
    }
    if(!value.match(value_regexp)){
        var e = new Error("value has wrong format");
        callback(e);
    }

    db.run(sql,[key,value],function (err) {
        if(err){
            logger.fatal(err.message);
            callback(err);
        }else{
            logger.debug('added key ' + key + ' to faucet db');
            callback();
        }
    });
};

couponDB.getAndDeleteKey = function(callback){
  let sql = 'SELECT * FROM codes LIMIT 1; DELETE FROM codes WHERE  key=(SELECT key FROM codes LIMIT 1)';
  db.get(sql,[],(err,row)=>{
      if(err){
          logger.fatal(err);
          callback(err,null);
      }else{
          callback(null,row);
      }
  })
};

couponDB.getKeyCount = function(callback){
    let sql = 'SELECT count() FROM codes';
    db.get(sql,[],(err,row)=>{
        if(err){
            logger.fatal(err);
            callback(err,null);
        }else{
            callback(null,row['count()']);
        }
    })
}

couponDB.addCoupon = function(coupon, callback){
    let sql = 'INSERT INTO coupons VALUES(?,?,?,?,?)';
    db.run(sql,[coupon.id,coupon.key,coupon.value,coupon.name, coupon.date],function (err) {
        if(err){
            logger.fatal(err.message);
            callback(err);
        }else{
            logger.debug('added coupon ' + coupon.id + ' to coupon db');
            callback();
        }
    });
};

couponDB.getCoupon = function(id,callback){
    if (!validate(id)){
        callback(new Error("ID has wrong format"));
        return;
    }
    let sql = 'SELECT * FROM coupons WHERE id=? LIMIT 1';
    db.get(sql,[id],(err,row)=>{
        if(err){
            logger.fatal(err);
            callback(err,null);
        }else if (!row){
            callback(null,null);
        }else{
            let coupon = new Coupon(row.id,row.key,row.value,row.name,row.date);
            callback(null,coupon);
        }
    })
}

module.exports = couponDB;