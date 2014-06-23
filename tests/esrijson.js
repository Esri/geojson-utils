var root = this;

var t,
  numTests,
  testPolygonFeatures = [
    {
      esriJson:getTestSingleRingPoly(),
      type: "Polygon with single outer ring"
    },
    {
      esriJson:getTestSingleOuterSingleInnerPoly(),
      type: "Polygon with single outer and single inner rings"
    }
  ],
  testMultiPolygonFeatures = [
    {
      esriJson:getTestMultiOuterPoly(),
      type: "Polygon with multiple outer rings",
      polyRings: [1, 1]
    },
    {
      esriJson:getTestMultiOuterMultiInnerPoly(),
      type: "Polygon with multiple outer rings and multiple inner",
      polyRings: [2, 1]
    }
  ];

function esriJsonPolygonTest(obj) {
  test("Converting EsriJSON of " + obj.type + " to GeoJSON", function () {
    var esriJson = obj.esriJson,
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Polygon", "GeoJSON is type Polygon");
    equal(geoJson.coordinates.length, esriJson.rings.length, "GeoJSON polygon has same number of rings as EsriJSON");
  });
}

function esriJsonMultiPolygonTest(obj) {
  test("Converting EsriJSON of " + obj.type + " to GeoJSON", function () {
    var esriJson = obj.esriJson,
      geoJson = root.esriConverter().toGeoJson(esriJson),
      i,
      len;
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "MultiPolygon", "GeoJSON is type MultiPolygon");
    equal(geoJson.coordinates.length, obj.polyRings.length, "GeoJSON MultiPolygon has same number of polygons as EsriJSON");
    for (i = 0; i < geoJson.coordinates.length; i += 1){
      equal(geoJson.coordinates[i].length, obj.polyRings[i], "Polygon number " + i + " has correct number of rings");
    }
  });
}

function esriJsonPointTests(){
  //valid point
  test("Converting EsriJSON of Point with valid XY to GeoJSON", function () {
    var esriJson = {"x": -77.2, "y": 39.8},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Point", "GeoJSON is type Point");
    equal(geoJson.coordinates.length, 2, "GeoJSON Coordinates has length of 2");
    equal(geoJson.coordinates[0], esriJson.x, "GeoJSON X equals EsriJSON X");
    equal(geoJson.coordinates[1], esriJson.y, "GeoJSON Y equals EsriJSON Y");
  });

  //NaN  values
  test("Converting EsriJSON of Point with Nan X to GeoJSON", function () {
    var esriJson = {"x": "NaN", "y": "NaN"},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });
  
  //0 X value
  test("Converting EsriJSON of Point with 0 X to GeoJSON", function () {
    var esriJson = {"x": 0, "y": 38.2},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Point", "GeoJSON is type Point");
    equal(geoJson.coordinates.length, 2, "GeoJSON Coordinates has length of 2");
    equal(geoJson.coordinates[0], esriJson.x, "GeoJSON X equals EsriJSON X");
    equal(geoJson.coordinates[1], esriJson.y, "GeoJSON Y equals EsriJSON Y");
  });
  
  //Missing X value
  test("Converting EsriJSON of Point with mixxing X to GeoJSON", function () {
    var esriJson = {"y": 38.2},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });

  //NaN X value
  test("Converting EsriJSON of Point with NaN X to GeoJSON", function () {
    var esriJson = {"x": "NaN", "y": 38.2},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });

  //0 Y value
  test("Converting EsriJSON of Point with 0 Y to GeoJSON", function () {
    var esriJson = {"x": -77.8, "y": 0},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Point", "GeoJSON is type Point");
    equal(geoJson.coordinates.length, 2, "GeoJSON Coordinates has length of 2");
    equal(geoJson.coordinates[0], esriJson.x, "GeoJSON X equals EsriJSON X");
    equal(geoJson.coordinates[1], esriJson.y, "GeoJSON Y equals EsriJSON Y");
  });

  //Missing Y value
  test("Converting EsriJSON of Point with mixxing Y to GeoJSON", function () {
    var esriJson = {"x": -77.8},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });
  
  //NaN Y value
  test("Converting EsriJSON of Point with NaN Y to GeoJSON", function () {
    var esriJson = {"x": -77.8, "y": "NaN"},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });
}

function esriJsonEmptyGeometriesTest(){
  //Empty paths value
  test("Converting EsriJSON of Polyline with empty paths to GeoJSON", function () {
    var esriJson = {"paths": []},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });
  
  //Empty rings value
  test("Converting EsriJSON of Polygon with empty rings to GeoJSON", function () {
    var esriJson = {"rings": []},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    equal(geoJson, null, "GeoJson is null");
  });
}

function esriJsonFeatureTest(){
  test("Converting EsriJSON of Feature with valid Point Geom to GeoJSON", function () {
    var esriJson = {
      "geometry": {
        "x": -77.2,
        "y": 39.8
      },
      "attributes": {
        "attribute1": "whatever"
      }},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Feature", "GeoJSON is of type Feature");
    notEqual(typeof geoJson.geometry, "undefined", "GeoJSON geometry not null");
    notEqual(typeof geoJson.properties, "undefined", "GeoJSON properties not null");
    equal(geoJson.geometry.type, "Point", "GeoJSON geometry is type Point");
    equal(geoJson.geometry.coordinates.length, 2, "GeoJSON Coordinates has length of 2");
    equal(geoJson.geometry.coordinates[0], esriJson.geometry.x, "GeoJSON X equals EsriJSON X");
    equal(geoJson.geometry.coordinates[1], esriJson.geometry.y, "GeoJSON Y equals EsriJSON Y");
    equal(geoJson.properties.attribute1, esriJson.attributes.attribute1, "GeoJSON attribute equals EsriJSON Y");
  });

  test("Converting EsriJSON of Feature with invalid Point Geom to GeoJSON", function () {
    var esriJson = {
      "geometry": {
        "x": "NaN",
        "y": 39.8
      },
      "attributes": {
        "attribute1": "whatever"
      }},
      geoJson = root.esriConverter().toGeoJson(esriJson);
    console.log(JSON.stringify(geoJson));
    notEqual(typeof geoJson, "undefined", "GeoJson not null");
    equal(geoJson.type, "Feature", "GeoJSON is of type Feature");
    equal(geoJson.geometry, null, "GeoJSON geometry is null");
    notEqual(typeof geoJson.properties, "undefined", "GeoJSON properties not null");
    equal(geoJson.properties.attribute1, esriJson.attributes.attribute1, "GeoJSON attribute equals EsriJSON Y");
  });
}

for (t = 0; t < testPolygonFeatures.length; t += 1){
  esriJsonPolygonTest(testPolygonFeatures[t]);
}

for (t = 0; t < testMultiPolygonFeatures.length; t += 1){
  esriJsonMultiPolygonTest(testMultiPolygonFeatures[t]);
}

esriJsonPointTests();
esriJsonFeatureTest();
esriJsonEmptyGeometriesTest();

function getTestSingleRingPoly(){
  return  {
    "spatialReference" : {
      "wkid" : 102100
    },
    "rings" : [
      [
        [
          -2000.00,
          3000.00
        ],
        [
          2000.00,
          3000.00
        ],
        [
          2000.00,
          -3000.00
        ],
        [
          -2000.00,
          -3000.00
        ],
        [
          -2000.00,
          3000.00
        ]
      ]
    ]
  };
}

function getTestSingleOuterSingleInnerPoly() {
  return  {
    "spatialReference" : {
      "wkid" : 102100
    },
    "rings" : [
      [
        [
          -2000.00,
          3000.00
        ],
        [
          2000.00,
          3000.00
        ],
        [
          2000.00,
          -3000.00
        ],
        [
          -2000.00,
          -3000.00
        ],
        [
          -2000.00,
          3000.00
        ]
      ],
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
  };
}

function getTestMultiOuterPoly() {
  return  {
    "spatialReference" : {
      "wkid" : 102100
    },
    "rings" : [
      [
        [
          -2000.00,
          3000.00
        ],
        [
          2000.00,
          3000.00
        ],
        [
          2000.00,
          -3000.00
        ],
        [
          -2000.00,
          -3000.00
        ],
        [
          -2000.00,
          3000.00
        ]
      ],
      [
        [
          -4000.00,
          3000.00
        ],
        [
          4000.00,
          3000.00
        ],
        [
          4000.00,
          -2000.00
        ],
        [
          -4000.00,
          -2000.00
        ],
        [
          -4000.00,
          3000.00
        ]
      ]
    ]
  };
}

function getTestMultiOuterMultiInnerPoly() {
  return  {
    "spatialReference" : {
      "wkid" : 102100
    },
    "rings" : [
      [
        [
          -2000.00,
          3000.00
        ],
        [
          2000.00,
          3000.00
        ],
        [
          2000.00,
          -3000.00
        ],
        [
          -2000.00,
          -3000.00
        ],
        [
          -2000.00,
          3000.00
        ]
      ],
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
      ],
      [
        [
          -4000.00,
          3000.00
        ],
        [
          4000.00,
          3000.00
        ],
        [
          4000.00,
          -2000.00
        ],
        [
          -4000.00,
          -2000.00
        ],
        [
          -4000.00,
          3000.00
        ]
      ]
    ]
  };
}