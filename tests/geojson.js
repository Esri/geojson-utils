var _testGeoJson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"cartodb_id":46,"addr1":"18150 E. Pathfinder Rd.","addr2":"Rowland Heights","park":"Pathfinder Park"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-117.913883,33.96657],[-117.907767,33.967747],[-117.912919,33.96445],[-117.913883,33.96657]]]]}}]};

var root = this;
test('Test Converting GeoJSON MultiPolygon to EsriJSON', function () {
    var esriJson = root.jsonConverters.geoJsonConverter.toEsri(_testGeoJson);
    ok(typeof esriJson !== 'undefined', 'EsriJson not null');
    ok(_testGeoJson.features.length === esriJson.features.length, 'EsriJson has same amount of features as GeoJson');
});
