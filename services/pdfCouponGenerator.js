var QRCode = require('qrcode-svg');
var PDF = require('html-pdf');
var xml2js = require('xml2js');
var fs = require('fs');
const PdfCouponGenerator = function (){

};

const pdfCouponGenerator = new PdfCouponGenerator();


pdfCouponGenerator.generateCoupon = function (coupon, res, error) {
    qr = new QRCode(coupon.key);
    qr.options.height = 600;
    qr.options.width = 600;
    var qrG = qr.svg({container: 'g'});
    var parser = new xml2js.Parser();
    parser.parseString(qrG,function(err,parsedQRGroup){
        if (err) throw err;
        fs.readFile('./Coupon/coupon.svg','utf8', function(err, data){
            if (err) throw err;
            var parser = new xml2js.Parser();
            parser.parseString(data, function(err, template){
                if (err) throw err;
                parsedQRGroup.g['$'].transform = 'translate(147.45763,549.15255)';

                template.svg.g[4] = parsedQRGroup.g;
                var builder = new xml2js.Builder();
                var svg = builder.buildObject(template);
                fs.writeFileSync('./qr.svg',svg);
                // template.svg.g
                PDF.create(svg, {border: 0, type: 'pdf'}).toBuffer(function (err, buffer) {
                    if (err) {
                        error(err);
                    } else {
                        res.set('Content-Type','application/pdf');
                        res.set('Content-Disposition', 'attachment; filename=\"coupon.pdf\"');
                        res.send(buffer);
                    }

                });
            })
        });
    });




    // var svgText =




};


module.exports = pdfCouponGenerator;