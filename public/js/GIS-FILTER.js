var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

var cartoColor = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});



function filterLayer(data) {
  var selectedFeatures = [];
  var boundsPol = [];
  data.features.forEach(function(feature) {
      // Check if the feature is a polygon

      if (true) {
          // Create a Leaflet polygon from the coordinates
          var polygon = L.polygon(feature.geometry.coordinates);
                
          var bounds = polygon.getBounds().getCenter();
          
  
          polygonBounds = polygon.getBounds();
  
    
          var boundsPol = L.latLngBounds([[polygonBounds._northEast.lng, polygonBounds._northEast.lat], [polygonBounds._southWest.lng, polygonBounds._southWest.lat]]);
         
  
              if (fence2.getBounds().intersects(boundsPol)) {

                selectedFeatures.push({
                  type: "Feature",
                  properties: feature.properties,
                  geometry: feature.geometry,
                  bounds: bounds
              });
              }
            
          // You can do further processing with the bounds here
      }
  });
  
  var selectedGeoJSON = {
    type: "FeatureCollection",
    features: selectedFeatures
  };
  
  return selectedGeoJSON
  
  }


function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 8, // Adjust these styles as needed
        color: 'rgb(7, 224, 249)', // Change the color to your highlight color
    });
  }

//! resetHighlightFeature into each layer functionality  



//! RASTER TILES

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 24,
    subdomains:['mt0','mt1','mt2','mt3']
});

var mapBox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVhbmNtdSIsImEiOiJja2t4YjJvb3YwZWkwMnJwYmJ2Y2ZveXd3In0.sDTF6p3nHnz0Pfb221yVZA', {
attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`,  maxZoom: 23,}
);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 24,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
    // Create a new Leaflet map instance
    var layerOsm = new L.TileLayer ('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {subdomains:['server','services'], maxZoom:19, noWrap:false, attribution:'<a href="https://www.arcgis.com/">ArcGIS</a>' });
           

var setY = 4.7185;
var setX = -74.1945;
var zoom = 11;

var projectLineColors = {
  "1": "#976900", "2": "#ce06cb", "3": "#90857A", "4": "#969696",
  "5": "#0055aa", "6": "#ffff00", "7": "#ce06cb", "A": "#fd9a00", "C": "#fd9a00",
  "E": "#fd9a00", "SI": "#fd9a00", "H": "#fd9a00", "Air": "#ffff00", "B": "#ffff00",
  "D": "#ffff00", "F": "#ffff00", "M": "#ffff00", "G": "#9ace00", "FS": "#6e6e6e",
  "GS": "#6e6e6e", "J": "#976900", "Z": "#976900", "L": "#969696", "N": "#ffff00",
  "Q": "#ffff00", "R": "#ffff00"
};


// municipalities

var muni2 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: projectLineColors[feature.properties.OBJECTID_1],
      weight: 3,
      opacity: 1,
      dashArray: '2, 2',
      "fillOpacity": .01,
      clickable: false
    };

  },
  onEachFeature: function (feature, layer) {

    var label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'my-label-class',
        html: feature.properties.MpNombre
      })
    }).addTo(map);

  }

});

$.getJSON("data/munCFRO.geojson", function (data) {

  var filteredData = data.features.filter(function(feature) {
    // Example filtering: keeping only features with "type" property equal to "restaurant"
    return feature.properties.MpNombre === "Madrid";
});

  muni2.addData(filteredData);
});

// var markerClusters = new L.MarkerClusterGroup({
//   spiderfyOnMaxZoom: true,
//   showCoverageOnHover: false,
//   zoomToBoundsOnClick: true,
//   disableClusteringAtZoom: 17
// });




map = L.map("map", {
  minZoom: 10,
  maxZoom: 22,
  zoom: zoom,
  center: [setY, setX],
  layers: [cartoLight, muni2], //highlight],
  zoomControl: true,
  attributionControl: false,
  scrollWheelZoom: true,
  wheelPxPerZoomLevel: 40
});





// map.on("overlayadd", function (e) {
//   if (e.layer === landsNetworks) {
//     markerClusters.addLayer(landsNetworks);

//   }

// });

// map.on("overlayremove", function (e) {
//   if (e.layer === landsNetworks) {
//     markerClusters.removeLayer(landsNetworks);
    
//   }

// });

fenceLAT1 = 4.69
fenceLNG1 = -74.1544

fenceLAT2 = 4.65
fenceLNG2 = -74.1

var fenceCoords = [
  [fenceLAT1, fenceLNG2], // se
  [fenceLAT2, fenceLNG2], // ne
  [fenceLAT2, fenceLNG1], // nw
  [fenceLAT1,fenceLNG1] // sw
  // Add more coor -74.15dinates to create a fence
];

var fence2 = L.polygon(fenceCoords, { color: 'red' }).addTo(map);





            
            L.control.scale ({maxWidth:240, metric:true, imperial:false, position: 'bottomleft'}).addTo (map);
            let polylineMeasure = L.control.polylineMeasure ({position:'topleft', unit:'kilometres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true})
            polylineMeasure.addTo (map);

            function debugevent(e) { console.debug(e.type, e, polylineMeasure._currentLine) }

            map.on('polylinemeasure:toggle', debugevent);
            map.on('polylinemeasure:start', debugevent);
            map.on('polylinemeasure:resume', debugevent);
            map.on('polylinemeasure:finish', debugevent);
            map.on('polylinemeasure:change', debugevent);
            map.on('polylinemeasure:clear', debugevent);
            map.on('polylinemeasure:add', debugevent);
            map.on('polylinemeasure:insert', debugevent);
            map.on('polylinemeasure:move', debugevent);
            map.on('polylinemeasure:remove', debugevent);


    // Load the JSON data using jQuery's $.getJSON() method
  


var projectLines = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'red',
      weight: 3,
      opacity: 1,
      dashArray: '10, 10',
    };
  }
});
$.getJSON("data/projectLine.geojson", function (data) {
  projectLines.addData(data);
});


var redLineV2 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#6D0A16',
      weight: 3,
      opacity: 1,
      dashArray: '10, 10',
    };
  }
});
$.getJSON("data/redLineV2.geojson", function (data) {
  redLineV2.addData(data);
});





var newArchPol = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#ce06cb',
      weight: 3,
      opacity: 1
      
    };
  },
  onEachFeature: function (feature, layer) {
    
    layer.on({
                mouseover: highlightFeature,
                mouseout: function(e) {
                  newArchPol.resetStyle(e.target);
                }
            });
            let aream2 = feature.properties.Aream2.toFixed(2)
            layer.bindPopup("Punto: " + feature.properties.id + "<br>Area:" + aream2 + " m2"); 
}
});
$.getJSON("data/newArchPol.geojson", function (data) {
  newArchPol.addData(data);
});

// point mark

// var newArch = L.geoJson(null, {
//   pointToLayer: function (feature, latlng) {
//     return L.marker(latlng, {
//       icon: L.icon({
//         iconUrl: "img/museum.png",
//         iconSize: [24, 28],
//         iconAnchor: [12, 28],
//         popupAnchor: [0, -25]
//       }),
//       title: feature.properties.NAME,
//       riseOnHover: true
//     });
//   },
//   onEachFeature: function (feature, layer) {
    
//     layer.on({
//                 mouseover: highlightFeature,
//                 mouseout: function(e) {
//                   newArch.resetStyle(e.target);
//                 }
//             });

//             layer.bindPopup('Punto: ' + feature.properties.pto + '<br>' + feature.properties.Abscisa); 
// }
// });
// $.getJSON("data/newArch.geojson", function (data) {
//   newArch.addData(data);
// });




//enviromental line



var securityLine3m = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#EC0BEF',
      weight: 3,
      opacity: 1,
      dashArray: '8, 8',
    };
  }
});
$.getJSON("data/3m.geojson", function (data) {
  securityLine3m.addData(data);
});

var networksLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'green',
      weight: 3,
      opacity: 1,
      dashArray: '8, 8',
    };
  }
});
$.getJSON("data/networksLine.geojson", function (data) {
  networksLine.addData(data);
});




var myIcon = L.divIcon({
  html: "<div style='font-size: 1px' class='my-icon'>pks</div>",
  className: 'custom-icon-pk'
});

var pks2 = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, { 
      icon: myIcon
     });
  }
})


map.on('zoomend', function() {
  pks2.eachLayer(function(layer) {
     var zoom = map.getZoom();
        if (zoom == 20 ){

        if(map.hasLayer(mapBox)){
        map.removeLayer(mapBox)
        map.addLayer(googleSat)
        }
      };

      if (zoom < 19) {
        if(map.hasLayer(googleSat)){
          map.removeLayer(googleSat)
          map.addLayer(mapBox)

        }
      
      }




    iconClass = 'custom-icon-pk'

    let zoomArray = (zooma) => {
      zoomArrayO = { "20": 15,
                  "19": 13,
                  "18": 10,
                  "17": 10,
                  "16": 9,
                  "15": 8,
                  "14": 8,
                  "13": 1,
                  "12": 2,
                  "11": 2,
                  "10": 2,

        } ; 
     
    return  zoomArrayO[zooma];
  }

  layer.setIcon(L.divIcon({
      html:  `<div style='font-size: ${zoomArray(zoom)}px; -o-transform: rotate(45deg); transform: rotate(${layer.feature.properties.Angle}deg)'>${layer.feature.properties.Text}</div>`,
      className: iconClass
      
    }));
  });
});

$.getJSON("data/pks.geojson", function (data) {
  pks2.addData(data); });
  map.addLayer(pks2)

  var railLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'black',
      weight: 2,
      opacity: 1,
      dashArray: '6, 6',
      dashOffset: '2, 2',
    };
  }
});
$.getJSON("data/railLine.geojson", function (data) {
  railLine.addData(data);
});
map.addLayer(railLine)

// utilities LAYERS

var acuColors = {
        "RED-MATRIZ-EXIST": "blue", "RED-MENOR-EXIST": "#07ACF4", "RETIRAR": "red", "RED-MATRIZ-PROY": "BLUE", "RED-MENOR-PROY":  "#07ACF4"
    
      };

var acuExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color:  acuColors[feature.properties.RefName],
      opacity: 1,
      weight: 2,
      dashArray: '3, 3',
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
}
});


$.getJSON("data/acuExist.geojson", function (data) {
  acuExist.addData(data);
});

var acuProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color:  acuColors[feature.properties.RefName],
      opacity: 1,
      weight: 2,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/acuProy.geojson", function (data) {
  acuProy.addData(data);
});


var enelExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'yellow',
      dashArray: '3, 5',
      opacity: 1,
      weight: 3,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/enelExist.geojson", function (data) {
  enelExist.addData(data);
});



var enelProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#F4E807',
 
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/enelProy.geojson", function (data) {
  enelProy.addData(data);
});
// var layerGroupWater= L.layerGroup([majorExist, majorProy, minorExist, minorProy, toRetire]);

var alcProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(208, 2, 244)',
 
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/alcProy.geojson", function (data) {
  alcProy.addData(data);
});

var alcExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(238, 6, 165)',
      dashArray: '3, 5',
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/alcExist.geojson", function (data) {
  alcExist.addData(data);
});


var etbExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(6, 250, 112)',
      dashArray: '3, 5',
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/etbExist.geojson", function (data) {
  etbExist.addData(data);
});



var etbProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(11, 251, 7)',
    
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/etbProy.geojson", function (data) {
  etbProy.addData(data);
});

var gasExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(120, 1, 1)',
      dashArray: '3, 5',
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/gasExist.geojson", function (data) {
  selectedFeatures = filterLayer(data)
  gasExist.addData(selectedFeatures)
});


var gasProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(122, 3, 3)',
    
      opacity: 1,
      weight: 2,
      clickable: true
    };trim
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/gasProy.geojson", function (data) {
  gasProy.addData(data);
});

var environLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#ffff00',
      weight: 3,
      opacity: 1,
      dashArray: '8, 8',
    };
  }
});
$.getJSON("data/envLine.geojson", function (data) {
  environLine.addData(data);
});

var networksColors = {
  "BUILDING AND LAND": "#107BAD", "PUBLIC ZONE": "#fd9a00", "ONLY LAND": "#ffff00"
};

var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 18
});

var landsNetworks = L.geoJson(null, {

  style: function (feature) {
    return {
      color:  networksColors[feature.properties.tipo],
      opacity: 1,
      weight: 2,

      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
   
        var labelsS = L.marker(layer.getBounds().getCenter(), {
          icon: L.divIcon({
            className: 'my-label-class',
            html: feature.properties.ID
          })
        })
      
        map.on('mousemove', function() {
        if(map.hasLayer(landsNetworks)){
          labelsS.addTo(map)
       
        }
        else{
          map.removeLayer(labelsS)
          map.removeLayer(markerClusters)
          }
      })
      layer.on({
        mouseover: (e) => {highlightFeature(e)
        
        info.update(layer.feature.properties, 'landsNetworks')
        },
        mouseout: (e) => {landsNetworks.resetStyle(e.target);}
      })
      
      let dateDel =  (feature.properties.ACT==1) ? "24-8-2024" : "Act no Signed"
    layer.bindPopup('<b>' + "UTILITIES LAND" + '</b><p>' + feature.properties.tipo +'</p><br>' + "DeadLine Deliver: " + dateDel); 
    
      
    
    }
});
$.getJSON("data/landsNetworks.geojson", function (data) {

   landsNetworks.addData(data);

});


$.getJSON("data/landsNetworks.geojson", function (data) {


  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      // Assuming each feature is a point
      var coordinates = layer.getBounds().getCenter(); // Get coordinates of the point feature
      var marker = L.marker(coordinates); // Create a marker at the coordinates
      // marker.bindPopup(feature.properties.name); // You can customize the popup content here
      markerClusters.addLayer(marker);
      
    }

  });

     map.addLayer(markerClusters);

});



map.on("overlayadd", function (e) {
  if (e.layer === landsNetworks) {
    // markerClusters.addLayer(landsNetworks)  
    var zoom = map.getZoom();
    (zoom<18)?    map.addLayer(markerClusters) : ""

  }
 
});

map.on("overlayremove", function (e) {
  if (e.layer === landsNetworks) {
    // markerClusters.removeLayer(landsNetworks)
    map.removeLayer(markerClusters);
  }
  
});



if (map.hasLayer(landsNetworks)) {
        
  map.addLayer(markerClusters);
}

var cenitColor = {
  "JETDUCTO": "rgb(242, 96, 11)", "POLIDUCTO": "rgb(75, 153, 2)",
  "PROPANODUCTO": "rgb(241, 36, 224)"
};

var cenit2022 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: cenitColor[feature.properties.RefName],
      weight: 3,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
    
    layer.on({
                mouseover: highlightFeature,
                mouseout: function(e) {
                  cenit2022.resetStyle(e.target);
                }
            });

            layer.bindPopup(feature.properties.RefName); 
}
});


$.getJSON("data/cenit2022.geojson", function (data) {
  cenit2022.addData(data);
});






var movExist = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "rgb(210, 50, 0)",
      weight: 2,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.RefName); 
}
});
$.getJSON("data/movExist.geojson", function (data) {
  movExist.addData(data);
});

var prediosCenit = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgb(17, 5, 238)',
 
      opacity: 1,
      weight: 2,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/prediosCenit.geojson", function (data) {
  prediosCenit.addData(data);
});


var cenitColorFont = {
  "4": "rgb(5, 231, 247)", "30": "rgb(243, 88, 5)", "6": "rgb(243, 10, 247)"
};

var cenitFont = L.geoJson(null, {
  style: function (feature) {
    return {
      color: cenitColorFont[feature.properties.Color],
 
      opacity: 1,
      weight: 2,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
}
});
$.getJSON("data/cenitFont.geojson", function (data) {
  cenitFont.addData(data);
});




var cenitServ = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#980',
      weight: 3,
      opacity: 1,
      dashArray: '6, 6',
      dashOffset: '2, 2',
      
    };
  },
 
  })

$.getJSON("data/cenitServ.geojson", function (data) {
  cenitServ.addData(data);
});

var AramaLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#6412D5',
      weight: 3,
      opacity: 1,
      dashArray: '8, 8',
    };
  }
});
$.getJSON("data/AramaLine.geojson", function (data) {
  AramaLine.addData(data);
});






var landsColors = {
  "NO DELIVERED": "red", "DELIVERED": "green", "DEMOLISHED": "#6e6e6e", "DELIVERED ONLY LAND": "#9ace00",
  "DELIVERED LIST TO DEMOLISH": "GREEN"
};




var landsEFR = L.geoJson(null, {
  style: function (feature) {
    return {
      // color:  "green",
      color:  landsColors[feature.properties.EFR_ENTRG],
      opacity: 1,
      weight: 2,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
        var labelsS = L.marker(layer.getBounds().getCenter(), {

          icon: L.divIcon({
            className: 'my-label-class',
            html: feature.properties.PARCEL_ID
          })
        })  

        map.on('mousemove', function() {
        if(map.hasLayer(landsEFR)){
          labelsS.addTo(map)
        }
        else{
          map.removeLayer(labelsS)
          }
      })
      
      layer.on({
        mouseover: highlightFeature,
        mouseout: function(e) {
          landsEFR.resetStyle(e.target);
        }
       });
       let titleLabel =  (feature.properties.PROPIETARI=="INVIAS") ? "INVIAS LAND " + feature.properties.PARCEL_ID : "EFR LAND " + feature.properties.PARCEL_ID
       let dateDel =  (feature.properties.EFR_ENTRG=="DELIVERED") ? (new Date(feature.properties.DATE_DEL)).toDateString() : "No Delivered"

       layer.bindPopup('<b>' + titleLabel + '</b><br>' + "Date Deliver: " + dateDel); 
    }
});






$.getJSON("data/landsEFR.geojson", function(data) {

selectedFeatures = filterLayer(data)
landsEFR.addData(selectedFeatures)

});





var Bridges = L.geoJson(null, {
  style: function (feature) {
    return {
      color:  "orange",
      opacity: 1,
      weight: 2,
      clickable: true
    };
  },
  onEachFeature: function sss(feature, layer) {
        var labelsS = L.marker(layer.getBounds().getCenter(), {
          icon: L.divIcon({
            className: 'my-label-class',
            html: feature.properties.Name
          })
        })  
        map.on('mousemove', function() {
        if(map.hasLayer(Bridges)){
          labelsS.addTo(map)
        }
        else{
          map.removeLayer(labelsS)
          }
      })
    }
});

$.getJSON("data/Bridges.geojson", function (data) {
  Bridges.addData(data);
});


var Stations = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'blue',
      weight: 3,
      opacity: 1,
      
    };
  },
  onEachFeature: function sss(feature, layer) {

    var labelsS = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'my-label-class',
        html: feature.properties.Name
      })
    })
  
    map.on('mousemove', function() {
    if(map.hasLayer(Stations)){
    labelsS.addTo(map)
    }
    else{
      map.removeLayer(labelsS)
      }
  })

  
 
}
});



$.getJSON("data/Stations.geojson", function (data) {
  selectedFeatures = filterLayer(data)

  Stations.addData(selectedFeatures);
});




//!     LAYERS TREE SECTION

var baseTree = [
            {
                label: 'Base Maps',
                children: [
                    {label: 'Light Map', layer: cartoLight},
                    {label: 'Color Map', layer: cartoColor},
                    {label: 'Google Sat', layer: googleSat},
                    {label: 'MapBox Sat', layer: mapBox},
                    {label: 'Esri Sat', layer: Esri_WorldImagery},
                ]
            }
        ];

        var overlaysTree = {
            label: 'Cfro Layers',
            selectAllCheckbox: 'Un/select all',
            children: [
                {label: '<div id="onlysel">-Show only selected-</div>'},
                {label: 'Reference', children: [
                  

                    {label: '0+000 View PKs', layer: pks2},
                    {label: 'Project Line', layer: projectLines},
                    {label: 'Red Line V2', layer: redLineV2},
                    {label: 'RailTrack', layer: railLine},
                    {label: 'Security Line', layer: securityLine3m},
                    {label: 'Environmental Line', layer: environLine},
                ]},
                {label: 'Utilities Existing', selectAllCheckbox: true, children: [
                    {label: 'Water Supply Exist', layer: acuExist},
                    {label: 'Energy Exist', layer: enelExist},
                    {label: 'Drainage Exist', layer: alcExist},
                    {label: 'Etb Exist', layer: etbExist},
                    {label: 'Gas Exist', layer: gasExist},
                    {label: 'Movistar Exist', layer: movExist},
                 
                ]},
                {label: 'Utilities Movements',
                selectAllCheckbox: true, children: [
                    {label: 'Water Supply Mov', layer: acuProy},
                    {label: 'Energy Exist', layer: enelProy},
                    {label: 'Drainage Exist', layer: alcProy},
                    {label: 'Etb Exist', layer: etbProy},
                    {label: 'Gas Exist', layer: gasProy},
                    {label: 'Movistar Exist', layer: movExist},
                    ],
                },
                {label: 'Cenit',
                selectAllCheckbox: true, children: [
                    {label: 'Cenit Ext', layer: cenit2022},
                    {label: 'Serv Cenit', layer: cenitServ},
                    {label: 'Arema Line', layer: AramaLine},
                    
                    ],
                },
                {label: 'Areas',
                selectAllCheckbox: true, children: [
                    {label: 'Lands Utilities', layer: landsNetworks},
                    {label: 'Lands EFR and INVIAS', layer: landsEFR},
                    {label: 'Archeology Areas', layer: newArchPol},
                  
                    
                    ],
                },
                {label: 'Structures',
                selectAllCheckbox: true, children: [
                    {label: 'Bridges', layer: Bridges},
                    {label: 'Stations', layer: Stations},
                  
                    
                    ],
                },
            ]
        }


//! INFO PROPERTIES SECTION

        var info = L.control({
          position: 'bottomleft'
      });
      

      info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
      };
      
      
      info.update = function (properties, layer) {
          this._div.innerHTML =
      

              '<h4>Properties</h4>' + (properties ?
                  `
                      Aantal: ${properties.RefName}<br>
                      Gemeente: ${properties.tipo}<br>
                      Provincie:${properties.province}<br>
                      Plaats:${properties.town}<br>
                      Postcode:${properties.zipcode}
                      
                          ` : 'Hover over a state');;
      };
      
      info.addTo(map);