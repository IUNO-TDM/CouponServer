var uuid = require('uuid');

function Coupon(key,name){
    this.key = key;
    this.name ="";
    if(name){
        this.name =name
    }
    this.id = uuid.v4();
}

module.exports = Coupon;