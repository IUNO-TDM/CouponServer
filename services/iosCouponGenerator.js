
const { Template } = require("@destinationstransfers/passkit");
const CONF = require("../config/config_loader");

var logger = require('../global/logger');

const IosCouponGenerator = function () {

};
const template = new Template("coupon", {
    formatVersion : 1,
    passTypeIdentifier: "pass.com.trumpf.iuno.coupon",
    teamIdentifier:     "YC8CNSGUUG",
    backgroundColor:   "rgb(192, 202, 69)",
    organizationName : "IUNO",
    description : "Getränkegutschein",
    logoText : "IUNO-Projekt",

});
template.keys(CONF.CERT_PATH,CONF.CERT_SECRET);
template.images.loadFromDirectory('./Coupon');


const iosCouponGenerator = new IosCouponGenerator();

iosCouponGenerator.generateCoupon = function (coupon, response, error) {

    if(CONF.CERT_PATH === ''){
        logger.warn('No Cert Path for iOS coupons is defined.');
        response.sendStatus(500);
    }else{
        logger.info('Loading certificate files from: ' + CONF.CERT_PATH);
        var pass = template.createPass({
            coupon : {
                locations : [
                    {
                        "longitude" : 11.117900, //SPS IPC DRIVES 2017
                        "latitude" : 49.419236,   //SPS IPC DRIVES 2017
                        "relevantText": "ZVEI - Halle 6, Stand 140 D"
                    }
                ],
                beacons: [
                    {
                        "proximityUUID":"1E809A70-DF5E-4C81-BFE0-549D552D0BAF",
                        "relevantText":"Ganz in der Nähe ist der IUNO Getränkemischer",
                        "name" : "Stand 140 D"
                    } ],

                primaryFields : [
                    {
                        key : "offer",
                        label : "Getränkegutschein für einen Cocktail aus dem Technologiedaten-Marktplatz",
                        value : coupon.value * 1000 + " IUNO"
                    }
                ],
                secondaryFields : [
                    {
                        key : "location",
                        label : "SPS IPC Drives 2017 - Halle 6, Stand 140D "
                    }
                ],
                backFields: [
                    {
                        key : "website",
                        label : "Erstellen Sie selbst Cocktailrezepte",
                        value : "https://iuno.axoom.cloud"
                    }
                ]
            },
            serialNumber: coupon.id,
            barcode : {
                message : coupon.key,
                format : "PKBarcodeFormatQR",
                messageEncoding : "iso-8859-1"
            },
        });


        pass.render(response,error);
    }


};

module.exports = iosCouponGenerator;
