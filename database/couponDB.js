var CouponDB = function(){

};

const couponDB = new CouponDB();

couponDB.couponDict = {};
couponDB.addCoupon = function(coupon){
    couponDB.couponDict[coupon.id] = coupon;
};
couponDB.getCoupon = function (couponId) {
    return couponDB.couponDict[couponId];
};

module.exports = couponDB;