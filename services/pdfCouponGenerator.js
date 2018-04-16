var qr = require('qr-image');
var fs = require('fs');
var PDFDocument = require('pdfkit');
var svgToPdf = require('svg-to-pdfkit')
const PdfCouponGenerator = function (){

};

const pdfCouponGenerator = new PdfCouponGenerator();


pdfCouponGenerator.generateCoupon = function (coupon, res, error) {

    var qr_svg = qr.imageSync(coupon.key, { type: 'svg' });
    var whiteRect = '<svg width="200" height="200">' +
        '<rect width="200" height="200" style="fill:rgb(255,255,255)" />' +
        '</svg>';

    var doc = new PDFDocument({size: [300,533], margin: 5});
    doc.info = {Title:"IUNO_COUPON"};
    doc.pipe(res);


    var iunoSVG = fs.readFileSync('Coupon/iuno_bg.svg','utf8');
    svgToPdf(doc,iunoSVG,0,0,{width:300, height:533});

    var iunoSVG = fs.readFileSync('Coupon/iuno_weiss.svg','utf8');
    svgToPdf(doc,iunoSVG,70,15,{width:160, height:80});

    doc.font('Coupon/LiberationSans-Regular-webfont.ttf');
    doc.fillColor('white');
    doc.fontSize(10);
    doc.moveDown(8);
    doc.fontSize(14);
    doc.text("IT-Sicherheit muss nicht trocken sein!",{align:'center'});

    doc.moveDown(0.3);
    doc.fontSize(14);
    doc.text("Getränkegutschein im Wert von",{align:'center'});
    doc.fontSize(32);
    doc.moveDown(0.5);
    doc.text(coupon.value * 1000 + " IUNO ",{align:'center'});
    doc.moveDown(0.5);
    svgToPdf(doc,whiteRect,70,310,{width:140, height:140});
    svgToPdf(doc,qr_svg,75,315,{width:140, height:140});

    doc.fontSize(12);
    doc.text("Besuchen Sie uns auf der Hannover Messe 2018",{align:'center'});
    doc.font('Coupon/LiberationSans-Bold-webfont.ttf');
    doc.text( "IUNO, Halle 6, Stand D02/1",{align:'center'});
    doc.text( "AXOOM, Halle 8, Stand F12",{align:'center'});
    doc.font('Coupon/LiberationSans-Regular-webfont.ttf');
    doc.text( "und testen Sie unser Rezept für Datensicherheit.",{align:'center'});


    doc.fontSize(12);
    doc.moveDown(11);
    doc.text("Online einen eigenen Cocktail entwerfen\n und IUNOs verdienen:",{align:'center'});
    // doc.fillColor('blue');
    doc.text("https://iuno.axoom.cloud",{align:'center'});
    doc.end();
};


module.exports = pdfCouponGenerator;
