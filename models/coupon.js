var uuid = require('uuid');

function Coupon(id,key,value,name, date){
    this.key = key;
    this.value = value;
    this.name ="";
    this.date = date;
    if(name){
        this.name =name
    }
    this.id = id;
}

module.exports = Coupon;