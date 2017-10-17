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
    var doc = new PDFDocument({size: 'a6', margin: 40});
    doc.info = {Title:"IUNO_COUPON"};
    doc.pipe(res);

    var iunoSVG = fs.readFileSync('Coupon/iuno.svg','utf8');
    svgToPdf(doc,iunoSVG,90,15,{width:120, height:50});

    doc.fontSize(18);
    doc.moveDown(3)
    doc.text("Getränkegutschein",{align:'center'});

    doc.fontSize(12);
    doc.moveDown(0.5);
    doc.text("im Wert von",{align:'center'});
    doc.moveDown(0.5);
    doc.fontSize(18);
    doc.text(coupon.value * 1000 + " IUNO ",{align:'center'});

    svgToPdf(doc,qr.svg(),75,200,{width:140, height:140});

    doc.fontSize(8);
    doc.moveDown(1);
    doc.text("SPS IPC Drives 2017\nZVEI - Halle 6, Stand 140 D\n\"Automation meets IT\"",{align:'center'});


    doc.fontSize(8);
    doc.moveDown(15);
    doc.text("Online einen eigenen Cocktail entwerfen\n und IUNOs verdienen:",{align:'center'});
    doc.fillColor('blue');
    doc.text("https://iuno.axoom.cloud",{align:'center'});






    doc.end();
};


module.exports = pdfCouponGenerator;