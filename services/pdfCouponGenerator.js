var QRCode = require('qrcode-svg');
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
    var doc = new PDFDocument({size: [300,533], margin: 5});
    doc.info = {Title:"IUNO_COUPON"};
    doc.pipe(res);


    var iunoSVG = fs.readFileSync('Coupon/iuno_bg.svg','utf8');
    svgToPdf(doc,iunoSVG,0,0,{width:300, height:533});

    var iunoSVG = fs.readFileSync('Coupon/iuno_weiss.svg','utf8');
    svgToPdf(doc,iunoSVG,70,15,{width:160, height:80});

    doc.font('Coupon/Arial.ttf');
    doc.fillColor('white');
    doc.fontSize(10);
    doc.moveDown(10);
    doc.fontSize(14);
    doc.text("IT-Sicherheit muss nicht trocken sein!",{align:'center'});

    doc.moveDown(0.3);
    doc.fontSize(14);
    doc.text("Getränkegutschein im Wert von",{align:'center'});
    doc.fontSize(32);
    doc.moveDown(0.7);
    doc.text(coupon.value * 1000 + " IUNO ",{align:'center'});
    doc.moveDown(0.7);
    svgToPdf(doc,qr.svg(),75,310,{width:140, height:140});

    doc.fontSize(12);
    doc.text("Besuchen Sie uns am Gemeinschaftsstand",{align:'center'});
    doc.font('Coupon/Arial Bold.ttf');
    doc.text( "\"Automation meets IT\", ZVEI, Halle 6, Stand 140D",{align:'center'});
    doc.font('Coupon/Arial.ttf');
    doc.text( "und testen Sie unser Rezept für Datensicherheit.",{align:'center'});


    doc.fontSize(12);
    doc.moveDown(14);
    doc.text("Online einen eigenen Cocktail entwerfen\n und IUNOs verdienen:",{align:'center'});
    // doc.fillColor('blue');
    doc.text("https://iuno.axoom.cloud",{align:'center'});
    doc.end();
};


module.exports = pdfCouponGenerator;