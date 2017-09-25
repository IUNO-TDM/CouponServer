
const { Template } = require("@destinationstransfers/passkit");

const IosCouponGenerator = function () {

};
const template = new Template("coupon", {
    formatVersion : 1,
    passTypeIdentifier: "pass.com.trumpf.iuno.coupon",
    teamIdentifier:     "YC8CNSGUUG",
    backgroundColor:   "rgb(192, 202, 69)",
    locations : [
        {
            "longitude" : 9.061303,
            "latitude" : 48.816354
        }
    ],
    organizationName : "IUNO",
    description : "Getränkegutschein",
    logoText : "IUNO",
    coupon : {
        primaryFields : [
            {
                key : "offer",
                label : "Getränkegutschein für ein Getränk aus dem IUNO Technologiedaten-Marktplatz",
                value : "2 IUNO"
            }
        ]
    }
});
template.password = 'tw552iuno';
// template.images.icon = 'Coupon/icon.png';
template.images.loadFromDirectory('./Coupon');


const iosCouponGenerator = new IosCouponGenerator();

iosCouponGenerator.generateCoupon = function (coupon, response, error) {

    var pass = template.createPass({
        serialNumber: coupon.id,
        barcode : {
            message : coupon.key,
            format : "PKBarcodeFormatQR",
            messageEncoding : "iso-8859-1"
        },
    });
    pass.render(response,error);

};

module.exports = iosCouponGenerator;
