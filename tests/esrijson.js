var root = this;

var testFeatures = [{esriJson:getTestCounterClockwisePoly(), type: 'Polygon with counter-clockwise rings'}];

function esriJsonTest(obj) {

    test('Converting EsriJSON of Single ' + obj.type + ' to GeoJSON', function () {
        var esriJson = obj.esriJson
        var geoJson = root.esriConverter().toGeoJson(esriJson)
        console.log(geoJson);
        notEqual(typeof geoJson, 'undefined', 'GeoJson not null');
        equal(geoJson.coordinates[0].length, esriJson.rings[0].length, 'GeoJSON has same number of features as EsriJSON');
    });
}

    
for (var i = 0, len = testFeatures.length; i < len; i++) {
    esriJsonTest(testFeatures[i]);
}



function getTestCounterClockwisePoly() {
    return  {
        "type" : "polygon",
        "spatialReference" : {
            "wkid" : 102100
        },
        "rings" : [
            [
                [
                    -1000.00,
                    2000.00
                ],
                [
                    -1000.00,
                    -2000.00
                ],
                [
                    1000.00,
                    -2000.00
                ],
                [
                    1000.00,
                    2000.00
                ],
                [
                    -1000.00,
                    2000.00
                ]
            ]
        ]
    }
    
}



