var root = this;

doTests();

function doTests(){
    featureCollectionTest();
    pointTests();
    lineTests();
    polygonTests();
    geometryCollectionTests();
}

function featureCollectionTest(){
    test("Feature collection", function(){
        var geojson = {
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

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(geojson.features.length, esriJson.features.length, 'EsriJson has same amount of features as GeoJson');
        deepEqual(geojson.features[0].properties, esriJson.features[0].attributes, 'EsriJson has same attributes of feature in GeoJson');
    });
}

function pointTests(){
    test('Convert point to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                "type" : "Point",
                "coordinates" : [-89, 44]
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(geojson.geometry.coordinates[0], esriJson.geometry.x, 'EsriJson  x coordinate same as GeoJson');
        equal(geojson.geometry.coordinates[1], esriJson.geometry.y, 'EsriJson y coordinate are same as GeoJson');
    });

    test('Convert GeoJSON single Point with undefined geometry to EsriJSON', function () {
        var geojson = {
            "type" : "Feature",
            "properties" : {
                "fax" : "305-571-8347",
                "phone" : "305-571-8345"
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(typeof esriJson.geometry, 'undefined', 'EsriJson has no geometry');
        deepEqual(geojson.properties, esriJson.attributes, 'EsriJson has same attributes of feature in GeoJson');
    });

    test('Convert GeoJSON single Point with null geometry to EsriJSON', function () {
        var geojson = {
            "type" : "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": null
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        notEqual(typeof esriJson.geometry, 'undefined', 'EsriJson has geometry');
        equal(esriJson.geometry.x, null, 'EsriJson geometry has null x property');
    });

    test('Convert MultiPoint to EsriJSON', function(){
        var geojson = {
            "type": "Feature",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [[10, 2], [8, 4]]
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        deepEqual(esriJson.geometry.points, geojson.geometry.coordinates, 'EsriJson is type "points"');
    });
}

function lineTests(){
    test('Convert LineString to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                "type" : "LineString",
                "coordinates" : [[-89, 43], [-88, 44], [-88, 45]]
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        deepEqual(esriJson.geometry.paths, [geojson.geometry.coordinates], 'EsriJson is type "paths" and coordinates wrapped in an array');
    });

    test('Convert MultiLineString to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                "type" : "MultiLineString",
                "coordinates" : [[-89, 43], [-88, 44], [-88, 45], [-70, 30], [-70, 31], [-71, 32]]
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        deepEqual(esriJson.geometry.paths, geojson.geometry.coordinates, 'EsriJson is type "paths" and coordinates equal geojson coordinates');
    });

    test('Convert empty LineString to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                type: "LineString",
                coordinates: null
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        deepEqual(esriJson.geometry.paths, [], 'EsriJson is type "paths" and coordinates are empty array');
    });
}

function polygonTests() {
    test('Convert polygon with one ring to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                "type" : "Polygon",
                "coordinates" : [[[-80, 42], [-80, 50], [-89, 50], [-89, 42], [-89, 42]]]
            }
        };

        var poly = geojson.geometry.coordinates;
        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(poly.length, esriJson.geometry.rings.length, 'EsriJson has same number of rings as GeoJson');
        deepEqual(poly, esriJson.geometry.rings,  'EsriJson has ring coordinates equal to geojson');
    });

    test('Convert empty Polygon to EsriJSON', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                type: "Polygon",
                coordinates: null
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        deepEqual(esriJson.geometry.rings, [], 'EsriJson rings is empty array');
    });

    test('Convert multipolygon with just one polygon to EsriJSON', function(){
        var geojson ={
            "type":"Feature",
            "geometry":{
                "type":"MultiPolygon",
                "coordinates":[
                    [
                        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
                    ]
                ]
            }
        };

        var poly = geojson.geometry.coordinates;
        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(poly.length, esriJson.geometry.rings.length, 'EsriJson has same number of rings as GeoJson');
        deepEqual(poly, esriJson.geometry.rings,  'EsriJson has ring coordinates equal to geojson');
    });

    test('Convert multipolygon with multiple polygons to EsriJSON', function(){
        var geojson = {
            "type":"Feature",
            "geometry":{
                "type":"MultiPolygon",
                "coordinates": [
                    [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
                    [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
                ]
            }
        };

        var poly = geojson.geometry.coordinates;
        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(poly.length, esriJson.geometry.rings.length, 'EsriJson has same number of rings as GeoJson');
        deepEqual(poly, esriJson.geometry.rings,  'EsriJson has ring coordinates equal to geojson');
    });

    test('Convert Polygon with reversed outer ring to EsriJSON', function (){
        var geojson =  {
            type: "Feature",
            "geometry":
            { "type": "Polygon",
                "coordinates": [
                    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
                ]
            }
        };

        //reverse ring for comparison
        var poly = geojson.geometry.coordinates;
        var clockwiseRings = [];
        var ring  = poly[0];

        var coords = [];
        for(var r = ring.length - 1, c = ring.length; r >= 0; r--){
            coords.push(ring[r]);
        }
        clockwiseRings.push([coords]);
        clockwiseRings.push(poly[1]);

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(poly.length, esriJson.geometry.rings.length, 'EsriJson has same number of rings as GeoJson');
        deepEqual(poly, esriJson.geometry.rings,  'EsriJson has ring coordinates in proper order');
    });

    test('Convert Polygon with reversed inner ring to EsriJSON', function (){
        var geojson =  {
            type: "Feature",
            "geometry":
            { "type": "Polygon",
                "coordinates": [
                    [[100.0, 0.0], [100.0, 1.0], [101.0, 1.0], [101.0, 0.0], [100.0, 0.0]],
                    [[100.2, 0.2], [100.2, 0.8], [100.8, 0.8], [100.8, 0.2], [100.2, 0.2]]
                ]
            }
        };

        //reverse ring for comparison
        var poly = geojson.geometry.coordinates;
        var clockwiseRings = [];
        var ring  = poly[1];

        var coords = [];
        for(var r = ring.length - 1, c = ring.length; r >= 0; r--){
            coords.push(ring[r]);
        }
        clockwiseRings.push(poly[0]);
        clockwiseRings.push(coords);

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        notEqual(typeof esriJson, 'undefined', 'EsriJson not null');
        equal(poly.length, esriJson.geometry.rings.length, 'EsriJson has same number of rings as GeoJson');
        deepEqual(poly, esriJson.geometry.rings,  'EsriJson has ring coordinates in proper order');
    });
}

function geometryCollectionTests(){
    test('GeometryCollection', function(){
        var geojson = {
            "type" : "Feature",
            "geometry" : {
                "type" : "GeometryCollection",
                "geometries" : [{
                    "type" : "Polygon",
                    "coordinates" : [[[-95, 43], [-95, 50], [-90, 50], [-91, 42], [-95, 43]]]
                }, {
                    "type" : "Point",
                    "coordinates" : [-94, 46]
                }, {
                    "type" : "Polygon",
                    "coordinates" : [[[-89, 42], [-89, 50], [-80, 50], [-80, 42], [-89, 42]]]
                }]
            },
            "properties" : {
                "STATE_ABBR" : "ZZ",
                "STATE_NAME" : "Top"
            }
        };

        var esriJson = root.geoJsonConverter().toEsri(geojson);
        equal(esriJson.geometry.rings.length, 2,  "EsriJSON geometry should have a rings property");
        deepEqual(esriJson.geometry.rings[0], geojson.geometry.geometries[0].coordinates[0]);
        deepEqual(esriJson.geometry.rings[1], geojson.geometry.geometries[2].coordinates[0]);
    });
}


