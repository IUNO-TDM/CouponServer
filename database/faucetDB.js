var logger = require('../global/logger');
const CONFIG = require("../config/config_loader.js");

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(CONFIG.DATABASE_NAME,(err)=>{
    if (err) {
        logger.fatal(err.message);
    }else{
        logger.info('connected to Faucet DB')
    }
});
db.run('CREATE TABLE IF NOT EXISTS codes(key, value)');
db.run('CREATE TABLE IF NOT EXISTS coupons(id, key, value, date)');

var faucetDB = {};

faucetDB.addKey = function(key, value, callback){
    let sql = 'INSERT INTO codes(key,value) VALUES(?,?)';
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

faucetDB.getAndDeleteKey = function(callback){
  let sql = 'SELECT * FROM codes LIMIT 1; DELETE FROM codes WHERE  key=(SELECT key FROM codes LIMIT 1)';
  db.each(sql,[],(err,row)=>{
      if(err){
          logger.fatal(err);
          callback(err,null);
      }else{
          callback(null,row);
      }
  })

};

faucetDB.save

module.exports = faucetDB;