var QRCode = require('qrcode-svg');
var PDF = require('html-pdf');
var xml2js = require('xml2js');
var fs = require('fs');
var PDFDocument = require('pdfkit');
var svgToPdf = require('svg-to-pdfkit')
const PdfCouponGenerator = function (){

};

const pdfCouponGenerator = new PdfCouponGenerator();


pdfCouponGenerator.generateCoupon = function (coupon, res, error) {
    qr = new QRCode(coupon.key);
    qr.options.height = 200;
    qr.options.width = 200;
    var doc = new PDFDocument({size: 'a6'});
    doc.info = {Title:"IUNO_COUPON"};
    doc.pipe(res);
    doc.fontSize(18);
    doc.text("Getränkegutschein",{align:'center'});

    doc.fontSize(12);
    doc.text("\nim Wert von\n ",{align:'center'});
    doc.fontSize(18);
    doc.text(coupon.value * 1000 + " IUNO\n ",{align:'center'});

    doc.fontSize(8);
    doc.text("Besuchen Sie unseren Marktplatz:\nZVEI - Halle6, Stand 140 D\nGemeinschaftsstand \"Automation meets IT\"",{align:'center'});


    svgToPdf(doc,qr.svg(),75,250,{width:150, height:150});
    doc.end();
};


module.exports = pdfCouponGenerator;