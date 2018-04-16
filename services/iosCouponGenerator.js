
const { Template } = require("@destinationstransfers/passkit");
const CONF = require("../config/config_loader");

var logger = require('../global/logger');

const IosCouponGenerator = function () {

};
const template = new Template("coupon", {
    formatVersion : 1,
    passTypeIdentifier: "pass.com.trumpf.iuno.coupon",
    teamIdentifier:     "YC8CNSGUUG",
    backgroundColor:   "rgb(87, 139, 104)",
    organizationName : "IUNO",
    description : "Getränkegutschein",
    logoText : "",

});
template.keys(CONF.CERT_PATH,CONF.CERT_SECRET);
template.images.loadFromDirectory('./Coupon');


const iosCouponGenerator = new IosCouponGenerator();

iosCouponGenerator.generateCoupon = function (coupon, response, error) {

    if(CONF.CERT_PATH === ''){
        logger.warn('No Cert Path for iOS coupons is defined.');
        response.sendStatus(500);
    }else{
        logger.debug('Loading certificate files from: ' + CONF.CERT_PATH);
        var pass = template.createPass({
            coupon : {
                locations : [
                    {
                        "longitude" :  9.81025,
                        "latitude" :  52.32395,
                        "relevantText": "IUNO (Halle 6, Stand D02/1)"
                    },
                    {
                        "longitude" :  9.81131,
                        "latitude" :  52.32178,
                        "relevantText": "AXOOM (Halle 8, Stand F12)"
                    }
                ],
                beacons: [
                    {
                        "proximityUUID":"1E809A70-DF5E-4C81-BFE0-549D552D0BAF",
                        "relevantText":"Ganz in der Nähe ist der IUNO Getränkemischer",
                        "name" : "Hannover Messe"
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
                        label : "Hannover Messe 2018: Halle 6 D02/1 & Halle 8 F12 "
                    }
                ],
                backFields: [
                    {
                        key : "website",
                        label : "Erstellen Sie selbst Cocktailrezepte",
                        value : "https://iuno.axoom.cloud"
                    },
                    {
                        key : "redemption-1",
                        label : "IUNO-Projekt",
                        value : "Gemeinschaftsstand Industrial Security Halle 6, Stand D02/1"
                    },
                    {
                        key : "redemption-2",
                        label : "Axoom",
                        value : "Halle 8, Stand F12"
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
