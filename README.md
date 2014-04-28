#GeoJSON Utils

**Anybody looking to convert between Esri JSON and GeoJSON should check out the repository https://github.com/Esri/Terraformer. Terraformer contains a GeoJSON converter and a lot more functionality.**

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

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Anyone and everyone is welcome to contribute.

## Licensing
Copyright 2012 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/geojson-utils/master/license.txt) file.

## Examples
---------

### [Leaflet](http://esri.github.com/geojson-utils/examples/esri_leaflet.html)
This example shows how to map simple json features from Esri within the Leaflet Javascript mapping library.

### [Simple Features](http://esri.github.com/geojson-utils/examples/test.html)
This example shows how to map simple geojson features on an Esri JS API based map.

### [Search GeoCommons](http://esri.github.com/geojson-utils/examples/esri_geocommons.html)
This example shows searching for and mapping data that is in GeoCommons on an Esri JS API based map.

[](Esri Tags: GeoJSON Web Mapping)
[](Esri Language: JavaScript)

