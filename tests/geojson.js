var root = this;

var testFeatures = [{ geojson:getTestMultiPolygon(), type:'MultiPolygon with single Feature' },
{ geojson:getTestRealMultiPolygon(), type:'MultiPolygon with multiple Features' },
{ geojson:getTestPolyline(), type:'Polyline' },
{ geojson:getTestPoint(), type:'Point' },
{ geojson:getTestPoly(), type:'Polygon' },
{ geojson:getTestPolyHole(), type:'Polygon with Hole' },
{ geojson:getTestCollection(), type:'Collection' }];

function geoJsonTest(obj) {
    test('Converting GeoJSON FeatureCollection of ' + obj.type + ' to EsriJSON', function () {
        var geojson = obj.geojson;
        var esriJson = root.geoJsonConverter().toEsri(geojson);
        ok(typeof esriJson !== 'undefined', 'EsriJson not null');
        ok(geojson.features.length === esriJson.features.length, 'EsriJson has same amount of features as GeoJson');
        ok(geojson.features[0].properties.park === esriJson.features[0].attributes.park, 'EsriJson has same attributes of feature in GeoJson');
    });
}

for (var i = 0, len = testFeatures.length; i < len; i++) {
    geoJsonTest(testFeatures[i]);
}

test('Converting GeoJSON FeatureCollection of null Points to EsriJSON', function () {
    var geojson = getTestPointNull();
    var esriJson = root.geoJsonConverter().toEsri(geojson);
    ok(typeof esriJson !== 'undefined', 'EsriJson not null');
    ok(typeof esriJson.features[0].geometry === 'undefined', 'EsriJson has no geometry');
    ok(geojson.features.length === esriJson.features.length, 'EsriJson has same amount of features as GeoJson');
    ok(geojson.features[0].properties.fax === esriJson.features[0].attributes.fax, 'EsriJson has same attributes of feature in GeoJson');
});

test('Converting GeoJSON single null Point to EsriJSON', function () {
    var geojson = getTestPointNull();
    var esriJson = root.geoJsonConverter().toEsri(geojson.features[0]);
    ok(typeof esriJson !== 'undefined', 'EsriJson not null');
    ok(typeof esriJson.geometry === 'undefined', 'EsriJson has no geometry');
    ok(geojson.features[0].properties.fax === esriJson.attributes.fax, 'EsriJson has same attributes of feature in GeoJson');
});

function getTestMultiPolygon() {
    return {
        "type":"FeatureCollection",
            "features":[
            {
                "type":"Feature",
                "properties":{
                    "cartodb_id":46,
                    "addr1":"18150 E. Pathfinder Rd.",
                    "addr2":"Rowland Heights",
                    "park":"Pathfinder Park"
                },
                "geometry":{
                    "type":"MultiPolygon",
                    "coordinates":[[[ [-117.913883,33.96657], [-117.907767,33.967747], [-117.912919,33.96445], [-117.913883,33.96657] ]]]
                }
            }
        ]
    };
}

function getTestRealMultiPolygon() {
    return {
        "type":"FeatureCollection",
        "features":[
        {
            "type":"Feature",
            "properties":{
                "cartodb_id":46,
                "addr1":"18150 E. Pathfinder Rd.",
                "addr2":"Rowland Heights",
                "park":"Pathfinder Park"
            },
            "geometry":{
                "type":"MultiPolygon",
                "coordinates": [
                    [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
                [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
                    ]
            }
        }
        ]
    };
}

function getTestPolyline() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a73ws67n775q",
            "geometry" : {
                "type" : "LineString",
                "coordinates" : [[-89, 43], [-88, 44], [-88, 45]]
            },
            "properties" : {
                "InLine_FID" : 0,
                "SimLnFLag" : 0
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 2073,
        "limit" : 1
    };
}

function getTestPoint() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a7vs0i9rnyyx",
            "geometry" : {
                "type" : "Point",
                "coordinates" : [-89, 44]
            },
            "properties" : {
                "fax" : "305-571-8347",
                "phone" : "305-571-8345"
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 236,
        "limit" : 1
    };
}


function getTestPointNull() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a7vs0i9rnyyx",
            "properties" : {
                "fax" : "305-571-8347",
                "phone" : "305-571-8345"
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 236,
        "limit" : 1
    };
}

function getTestPoly() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a7ws7wldxold",
            "geometry" : {
                "type" : "Polygon",
                "coordinates" : [[[-89, 42], [-89, 50], [-80, 50], [-80, 42], [-89, 42]]]
            },
            "properties" : {
                "DIST_NUM" : 7.0,
                "LOCATION" : "Bustleton Ave. & Bowler St",
                "PHONE" : "686-3070",
                "DIST_NUMC" : "07",
                "DIV_CODE" : "NEPD",
                "AREA_SQMI" : 12.41643
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 25,
        "limit" : 1
    };
}

function getTestPolyHole() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a7ws7wldxold",
            "geometry" : {
                "type" : "Polygon",
                "coordinates" : [[[-89, 42], [-89, 50], [-80, 50], [-80, 42], [-89, 42]], [[-87, 44], [-82, 44], [-82, 48], [-87, 48], [-87, 44]]]
            },
            "properties" : {
                "DIST_NUM" : 7.0,
                "LOCATION" : "Bustleton Ave. & Bowler St",
                "PHONE" : "686-3070",
                "DIST_NUMC" : "07",
                "DIV_CODE" : "NEPD",
                "AREA_SQMI" : 12.41643
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 25,
        "limit" : 1
    };
}

function getTestCollection() {
    return {
        "next_feature" : "1",
        "type" : "FeatureCollection",
        "start" : 0,
        "features" : [{
            "type" : "Feature",
            "id" : "a7xlmuwyjioy",
            "geometry" : {
                "type" : "GeometryCollection",
                "geometries" : [{
                    "type" : "Polygon",
                    "coordinates" : [[[-95, 43], [-95, 50], [-90, 50], [-91, 42], [-95, 43]]]
                }, {
                    "type" : "Polygon",
                    "coordinates" : [[[-89, 42], [-89, 50], [-80, 50], [-80, 42], [-89, 42]]]
                }, {
                    "type" : "Point",
                    "coordinates" : [-94, 46]
                }]
            },
            "properties" : {
                "STATE_ABBR" : "ZZ",
                "STATE_NAME" : "Top"
            }
        }],
        "sort" : null,
        "page" : 0,
        "count" : 3,
        "limit" : 1
    };
}


