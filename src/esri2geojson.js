/**
 * @author James Cardona
 */
/**
 * Utilities to convert ESRI REST Features to GeoJSON Features. Both are similar,
 * but have different formats for geometries. GeoJSON differentiates between LineString and MultiLineString,
 * Polygon and MultiPolygon. ESRI Rest geometry just has Polyline and Polygon. GeoJson always has a coordinate
 * property and has a type property that specifies geometry type. ESRI Rest specifies point with x and y property,
 * lines with a paths property, multipoints with a points property and polygons with a rings property.
 */

"use strict"

function esritogeojson() {
  var jcon = {};

/*determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
   or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order*/
  function ringIsClockwise(ringToTest) {
    var total = 0,
        i = 0,
        pt1 = ringToTest[i],
        pt2;
    for (i; i < ringToTest.length - 1; i += 1) {
      pt2 = ringToTest[i + 1];
      total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
      pt1 = pt2;
    }
    return (total >= 0);
  }

/*jcon.esriGeomTypeToGcGeomType = function(esriType, numGeometryParts) {
    var gcType;
    if (esriType === "esriGeometryPoint") {
      gcType = "Point";
    } else if (esriType === "esriGeometryMultiPoint") {
      gcType = "Multipoint";
    } else if (esriType === "esriGeometryPolyline") {
      gcType = numGeometryParts && numGeometryParts > 1 ? "MultiLineString" : "LineString";
    } else if (esriType === "esriGeometryPolygon") {
      gcType = numGeometryParts && numGeometryParts > 1 ? "MultiPolygon" : "Polygon";
    }
    return gcType;
  };*/

  jcon.esriGeometryToGcGeometry = function(esriGeom) {
    var gcGeom, i, g, coordinates, geomParts, ringArray, ring;
    //check for x, points, paths, or rings to determine geometry type.
    //Then convert to coordinates in format for geojson
    if (esriGeom) {
      gcGeom = {};
      if (esriGeom.x) {
        gcGeom.type = "Point";
        coordinates = [esriGeom.x, esriGeom.y];
      } else if (esriGeom.points) {
        gcGeom.type = "MultiPoint";
        coordinates = esriGeom.points;
      } else if (esriGeom.paths) {
        geomParts = esriGeom.paths;
        if (geomParts.length === 1) {
          gcGeom.type = "LineString";
          coordinates = geomParts[0];
        } else {
          gcGeom.type = "MultiLineString";
          coordinates = geomParts;
        }
      } else if (esriGeom.rings) {
        geomParts = esriGeom.rings;
        ringArray = [];
        for (i = 0; i < geomParts.length; i += 1) {
          ring = geomParts[i];
          if (ringIsClockwise(ring)) {
            ringArray.push([ring]);
          } else {
            ringArray[ringArray.length - 1].push(ring);
          }
        }
        if (ringArray.length > 1) {
          coordinates = ringArray;
          gcGeom.type = "MultiPolygon";
        } else {
          coordinates = ringArray.pop();
          gcGeom.type = "Polygon";
        }
      }
      gcGeom.coordinates = coordinates;
    }
    return gcGeom;
  };

  /**
   * Converts GeoJSON feature to ESRI REST Feature.
   * Input parameter is an ESRI Rest Feature object
   */
  jcon.esriFeatureToGcFeature = function(esriFeature) {
    var gcFeat = null,
        prop, gcProps, i, p;
    if (esriFeature) {
      gcFeat = {
        type: "Feature"
      };
      if (esriFeature.geometry) {
        gcFeat.geometry = jcon.esriGeometryToGcGeometry(esriFeature.geometry);
      }
      if (esriFeature.attributes) {
        gcProps = {};
        p = esriFeature.attributes;
        for (prop in esriFeature.attributes) {
          gcProps[prop] = esriFeature.attributes[prop];
        }
        gcFeat.properties = gcProps;
      }
    }
    return gcFeat;
  };

  jcon.esriFeaturesetToGeojsonFeatureCollection = function(esriFS) {
    var gcColl, i, esriFeats, gcFeat;
    if (esriFS && esriFS.features) {
      gcColl = {
        type: "FeatureCollection",
        features: []
      };
      esriFeats = esriFS.features;
      for (i = 0; i < esriFeats.length; i += 1) {
        gcFeat = jcon.esriFeatureToGcFeature(esriFeats[i]);
        if (gcFeat) {
          gcColl.features.push(gcFeat);
        }
      }
    }
    return gcColl;
  };

  return jcon;
}

