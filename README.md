#GeoJSON Utils

This repository contains scripts and utilities for converting GeoJSON to other geographic json formats and vice versa. Currently only GeoJSON to Esri JSON has been developed. Also, note that only geometries in the WGS84 coordinate system are supported.

## Features

* Two simple javascript classes that convert ESRI's JSON geometry format to GeoJSON geometry format.
* Supports conversion of geometries or features that contain a geometry and attributes

## Instructions

* Save the src/jsonConverters.js file to a machine accessible to your application
* Reference the script in your application
* Use the esriConverter class to convert ESRI JSON geometry to GeoJSON (see the Leaflet example below for a code sample)
* Use the geoJsonConverter class to convert GeoJson geometries to ESRI JSON (see the Simple Features example below for a code sample)

## Requirements

* Basic knowledge of javascript

## Resources

* [ESRI Javascript API](http://help.arcgis.com/en/webapi/javascript/arcgis)
* [ESRI JSON Geometries](http://resources.arcgis.com/en/help/rest/apiref/geometry.html)
* [GeoJSON Specification](http://geojson.org/geojson-spec.html)

## Issues

If you find a bug or want to request a new feature, please submit an issue

## Contributing

Feel free to contribute. Just fork the repo, make changes or add new examples and submit a pull request

## Licensing

See MIT-LICENSE.txt in this repo

## Examples
---------

### [Leaflet](http://esri.github.com/geojson-utils/examples/esri_leaflet.html)
This example shows how to map simple json features from Esri within the Leaflet Javascript mapping library.

### [Simple Features](http://esri.github.com/geojson-utils/examples/test.html)
This example shows how to map simple geojson features on an Esri JS API based map.

### [Search GeoCommons](http://esri.github.com/geojson-utils/examples/esri_geocommons.html)
This example shows searching for and mapping data that is in GeoCommons on an Esri JS API based map.

