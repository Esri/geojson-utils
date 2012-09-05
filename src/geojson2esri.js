/**
 * @author James Cardona
 */

/**
 * Utilities to convert a GeoJSON Feature to an ESRI REST Feature. Both are similar,
 * but have different formats for geometries.
 *
 * This code was written to convert features queried from a Geocommons (www.geocommons.com) dataset
 * to ESRI REST features so they could be put on an ESRI javascript API map. Geocommons only
 * returns features in WGS84 using decimal degrees, so no check is made for the spatial
 * reference of the GeoJSON geometries.
 */
"use strict";

/**
 * Take a GeoJSON geometry type and make an object that has information about
 * what the ESRI geometry should hold. Includes the ESRI geometry type, the name
 * of the member that holds coordinate information, and a function that compares
 * a GeoJSON geometry type and ESRI geometry type to see if they can be safely
 * put together in a single ESRI feature. ESRI features must only have one
 * geometry type, point, line, polygon
 *
 * Input is a GeoJSON geometry type - Point,LineString,Polygon, etc
 *
 */
function geojson2esri() {
  var jcon = {};

  function isCompatible( esriGeomType, gcGeomType ) {
    var compatible = false;
    if (( esriGeomType === "esriGeometryPoint" || esriGeomType === "esriGeometryMultipoint" ) && ( gcGeomType === "Point" || gcGeomType === "MultiPoint" )) {
      compatible = true;
    } else if ( esriGeomType === "esriGeometryPolyline" && ( gcGeomType === "LineString" || gcGeomType === "MultiLineString" )) {
      compatible = true;
    } else if ( esriGeomType === "esriGeometryPolygon" && ( gcGeomType === "Polygon" || gcGeomType === "MultiPolygon" )) {
      compatible = true;
    }
    return compatible;
  }
  
  jcon.gcGeomTypeToEsriGeomInfo = function( gcType ) {
    var esriType,
      geomHolderId, 
      compatibilityFunction;

    if ( gcType === "Point" ) {
      esriType = "esriGeometryPoint";
    } else if ( gcType === "MultiPoint" ) {
      esriType = "esriGeometryMultipoint";
      geomHolderId = "points";
    }  else if ( gcType === "LineString" || gcType === "MultiLineString" ) {
      esriType = "esriGeometryPolyline";
      geomHolderId = "paths";
    }  else if ( gcType === "Polygon" || gcType === "MultiPolygon" ) {
      esriType = "esriGeometryPolygon";
      geomHolderId = "rings";
    }
    
    return { 
      type: esriType, 
      geomHolder: geomHolderId 
    };
  }; 

  /**
   Wraps GeoJSON coordinates in an array if necessary so code can iterate
   through array of points, rings, or lines and add them to an ESRI geometry
   
   * Input is a GeoJSON geometry object. A GeoJSON GeometryCollection is not a
   * valid input */
  jcon.gcCoordinatesToEsriCoordinates = function( gcGeom ) {
    var i, esriCoords;

    if ( gcGeom.type === "MultiPoint" || gcGeom.type === "MultiLineString" || gcGeom.type === "Polygon" ) {
      esriCoords = gcGeom.coordinates;
    } else if ( gcGeom.type === "Point" || gcGeom.type === "LineString" ) {
      esriCoords = [ gcGeom.coordinates ];
    } else if ( gcGeom.type === "MultiPolygon" ) {
      esriCoords = [];
      for ( i = 0; i < gcGeom.coordinates.length; i++ ) {
        esriCoords.push( gcGeom.coordinates[i] );
      }
    }
    return esriCoords;
  };
  

  /**
   * Converts GeoJSON geometry to ESRI geometry. The ESRI geometry is
   * only allowed to contain one type of geometry, so if the GeoJSON
   * geometry is a GeometryCollection, then only geometries compatible
   * with the first geometry type in the collection are added to the ESRI geometry
   * 
   * Input parameter is a GeoJSON geometry object.
   */
  jcon.gcGeometryToEsriGeometry = function( gcGeom ) {
    var esriGeometry, 
      esriGeomInfo, 
      gcGeometriesToConvert, 
      i;
    
    //if geometry collection, get info about first geometry in collection
    if ( gcGeom.type === "GeometryCollection" ) {
      gcGeometriesToConvert = [ gcGeom.geometries.shift() ];
      esriGeomInfo = jcon.gcGeomTypeToEsriGeomInfo( gcGeometriesToConvert[0].type );
      
      //loop through collection and only add compatible geometries to the array
      //of geometries that will be converted
      for ( i = 0; i < gcGeom.geometries.length; i++ ) {
        if ( isCompatible( esriGeomInfo.type,gcGeom.geometries[i].type ) ) {
          gcGeometriesToConvert.push( gcGeom.geometries[i] );
        }
      }
    } else {
      esriGeomInfo = jcon.gcGeomTypeToEsriGeomInfo( gcGeom.type );
      gcGeometriesToConvert = [ gcGeom ];
    }
    
    //if a collection contained multiple points, change the ESRI geometry
    //type to MultiPoint
    if ( esriGeomInfo.type === "esriGeometryPoint" && gcGeometriesToConvert.length > 1 ) {
      esriGeomInfo = jcon.gcGeomTypeToEsriGeomInfo( "MultiPoint" );
    }
    
    //make new empty ESRI geometry object
    esriGeometry = { type: esriGeomInfo.type, spatialReference: { wkid:4326 }};
    
    //perform conversion
    if ( esriGeomInfo.type === "esriGeometryPoint") {
      if ( gcGeometriesToConvert[0].coordinates.length === 0 ) {
        esriGeometry.x = null;
        esriGeometry.y = null;
      } else {
        esriGeometry.x = gcGeometriesToConvert[0].coordinates[0];
        esriGeometry.y = gcGeometriesToConvert[0].coordinates[1];
      }
    } else {
      var g, coords;
      esriGeometry[ esriGeomInfo.geomHolder ] = [];

      for ( i=0; i < gcGeometriesToConvert.length; i++ ) {
        coords = jcon.gcCoordinatesToEsriCoordinates( gcGeometriesToConvert[i] );
        for ( g = 0; g < coords.length; g++ ) {
          esriGeometry[ esriGeomInfo.geomHolder ].push( coords[g] );
        }
      }
    }
    return esriGeometry;
  };
  

  /**
   * Converts GeoJSON feature to ESRI REST Feature. 
   * Input parameter is a GeoJSON Feature object
   */
  jcon.gcFeatureToEsriFeature = function ( gcFeature ) {
    var esriFeat = null, prop;
    if ( gcFeature ) {
      esriFeat = {};
      if ( gcFeature.geometry ) {
        esriFeat.geometry = jcon.gcGeometryToEsriGeometry( gcFeature.geometry );
      }
      if ( gcFeature.properties) {
        var esriAttribs = {};
        for( prop in gcFeature.properties ) {
          esriAttribs[ prop ] = gcFeature.properties[ prop ];
        }
        esriFeat.attributes = esriAttribs;
      }
    }
    return esriFeat;
  };
  return jcon;
}
