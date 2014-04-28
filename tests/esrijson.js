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

for (t = 0; t < testPolygonFeatures.length; t += 1){
  esriJsonPolygonTest(testPolygonFeatures[t]);
}

for (t = 0; t < testMultiPolygonFeatures.length; t += 1){
  esriJsonMultiPolygonTest(testMultiPolygonFeatures[t]);
}
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