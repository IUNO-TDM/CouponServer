var uuid = require('uuid');

function Coupon(key,value,name){
    this.key = key;
    this.value = value;
    this.name ="";
    if(name){
        this.name =name
    }
    this.id = uuid.v4();
}

module.exports = Coupon;