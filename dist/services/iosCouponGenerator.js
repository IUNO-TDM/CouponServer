"use strict";

var _require = require("@destinationstransfers/passkit"),
    Template = _require.Template;

var template = new Template("coupon", {
    passTypeIdentifier: "pass.com.trumpf.iuno.coupon",
    teamIdentifier: "YC8CNSGUUG",
    backgroundColor: "rgb(192, 202, 69)",
    locations: [{
        "longitude": 9.061303,
        "latitude": 48.816354
    }],
    organizationName: "IUNO",
    description: "Getränkegutschein",
    logoText: "IUNO",
    coupon: {
        primaryFields: [{
            key: "offer",
            label: "Getränkegutschein für ein Getränk aus dem IUNO Technologiedaten-Marktplatz",
            value: "2 IUNO"
        }]
    }
});
//# sourceMappingURL=iosCouponGenerator.js.map