layersProps = []
Color = []
layersProps["atribute"] = ["range","color","solid","type"]
layersProps["pks2"] = [false,"black",false,"line"]
layersProps["projectLine"] = [false,"red",true,"line"]
layersProps["redLineV2"] = [false,'#6D0A16',true,"line"]
layersProps["railLine"] = [false,'black',true,"line"]
layersProps["securityLine3m"] = [false,'rgba(255, 99, 71, 0.5)',true,"line"]
layersProps["environLine"] = [false,'#ffff00',true,"line"]
var acuColors = {"RED-MATRIZ-EXIST": "blue", "RED-MENOR-EXIST": "#07ACF4", "RETIRAR": "red", "RED-MATRIZ-PROY": "BLUE", "RED-MENOR-PROY":  "#07ACF4"};
layersProps["acuExis"] = [false,'blue',true,"line"]
layersProps["acuProy"] = [false,'blue',false,"line"]
layersProps["enelExis"] = [false,'yellow',true,"line"]
layersProps["enelProy"] = [false,'yellow',false,"line"]
layersProps["alcExis"] = [false,'rgb(208, 2, 244)',true,"line"]
layersProps["alcProy"] = [false,'rgb(208, 2, 244)',false,"line"]
layersProps["etbExis"] = [false,'rgb(6, 250, 112)',true,"line"]
layersProps["etbProy"] = [false,'rgb(6, 250, 112)',false,"line"]
layersProps["gasExis"] = [false,'rgb(122, 3, 3)',true,"line"]
layersProps["gasProy"] = [false,'rgb(122, 3, 3)',false,"line"]
layersProps["movExis"] = [false,"rgb(210, 50, 0)",true,"line"]
layersProps["movProy"] = [false,"rgb(210, 50, 0)",false,"line"]
Color['cenit'] = {"JETDUCTO": "rgb(242, 96, 11)", "POLIDUCTO": "rgb(75, 153, 2)", "PROPANODUCTO": "rgb(241, 36, 224)"};
layersProps["cenit"] = [true,'red',true,"line", {"JETDUCTO": "rgb(242, 96, 11)", "POLIDUCTO": "rgb(75, 153, 2)", "PROPANODUCTO": "rgb(241, 36, 224)"}]
layersProps["cenitServ"] = [false,'#980',true,"polygon"]
layersProps["aremaLine"] = [false,'#6412D5',true,"line"]
Color['landsNetworks'] = { "BUILDING AND LAND": "#107BAD", "PUBLIC ZONE": "#fd9a00", "ONLY LAND": "#ffff00"};
layersProps["landsNetworks"] = [true,'red',false,"polygon", { "BUILDING AND LAND": "#107BAD", "PUBLIC ZONE": "#fd9a00", "ONLY LAND": "#ffff00"}]
Color['landsEFR'] = {"NO DELIVERED": "red", "DELIVERED": "green", "DEMOLISHED": "#6e6e6e", "DELIVERED ONLY LAND": "#9ace00","DELIVERED LIST TO DEMOLISH": "GREEN"};
layersProps["landsEFR"] = [true,'red',false,"polygon",  {"NO DELIVERED": "red", "DELIVERED": "green"} ]
layersProps["newArchPol"] = [false,'#ce06cb',false,"polygon"]
layersProps["Bridges"] = [false,"orange",false,"polygon"]
layersProps["Stations"] = [false,'gray',false,"polygon"]





function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 8, // Adjust these styles as needed
        color: 'rgb(7, 224, 249)', // Change the color to your highlight color
    });
}

//! TILES 

var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

var cartoColor = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});


googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 24,
    subdomains:['mt0','mt1','mt2','mt3']
});

var mapBox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVhbmNtdSIsImEiOiJja2t4YjJvb3YwZWkwMnJwYmJ2Y2ZveX`d3In0.sDTF6p3nHnz0Pfb221yVZA', {
attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`,  maxZoom: 23,}
);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 24,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
    // Create a new Leaflet map instance
    var layerOsm = new L.TileLayer ('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {subdomains:['server','services'], maxZoom:19, noWrap:false, attribution:'<a href="https://www.arcgis.com/">ArcGIS</a>' });
           
    var munCFROColors = { "1": "#976900", "2": "#ce06cb", "3": "#90857A", "4": "#969696","5": "#0055aa", "6": "#ffff00", "7": "#ce06cb"};
        
    var munCFRO = L.geoJson(null, {
      style: function (feature) {
        return {
          color: munCFROColors[feature.properties.OBJECTID_1],
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
      munCFRO.addData(data);
    });
    

var setY = 4.7185
var setX = -74.1945

// var setY = 4.699;
// var setX = -74.1945;
var zoom = 11
// Create a Leaflet GeoJSON layer for projectLine

function decorator (data, pathOptions, decoratorText, textStyle){
  newPol = []
  newAllPol = []
  coordinatesAllPol = data.features
  coordinatesAllPol.forEach(e => {
    console.log(data);
console.log(e);

    
  newPol = []
  coordinatesPol = e.geometry.coordinates

    // if (e.id != 0 && decoratorText != 'Project Line' ){
    //   if (e.id != 2 && decoratorText != 'Project Line' ){
    
    coordinatesPol.forEach(element => {
      // console.log(element);
        newPol.push([element[1],element[0]])
  
        });
    //   }
    // }
    // console.log(element);
    newAllPol.push(newPol)

  });

  console.log(data.features[2].geometry.coordinates)

let textDiv = "Project Line"

  var pathPattern = L.polylineDecorator(

    newAllPol,
  
    {
        patterns: [
            { offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 5, pathOptions: pathOptions}) },
            { offset: textStyle.offset, 
            repeat: textStyle.repeat, 
            symbol: L.Symbol.marker({rotate: true, markerOptions: {
                icon: L.divIcon({
                  html: `<div style='font-size: 10px; transform: rotate(90deg);' class='my-icon'>${decoratorText}</div>`,
                  className: 'custom-icon-pk'
                })
            }})}
        ]
    }
  )
  
  pathPattern.addTo(map);

}


// Fetch GeoJSON data using jQuery's $.getJSON

var projectLine = L.geoJson(null, {
  
    style: function (feature) {
      return {
        color: layersProps['projectLine'][1],
        weight: 3,
        opacity: 1,
        dashArray: '10, 10',
      };
    }
  
}

  );

$.getJSON("data/projectLine.geojson", function (data) {
  // Add GeoJSON data to the projectLine layer
  projectLine.addData(data);

  // textStyle = {offset: '10%', repeat: '0.1%'}
  // pathOptions = {color: 'red', weight: 3, opacity: 0.8}
  // decoratorText = ""
  // decorator(data, pathOptions ,decoratorText, textStyle)
  
  
});




map = L.map("map", {
  minZoom: 10,
  maxZoom: 22,
  zoom: zoom,
  center: [setY, setX],
  layers: [cartoLight, munCFRO, projectLine],
  zoomControl: true,
  attributionControl: false,
  scrollWheelZoom: true,
  wheelPxPerZoomLevel: 40
});


// Add the projectLine GeoJSON layer to the map






var arrow = L.polyline([[57, -19], [60, -12]], {}).addTo(map);
var arrowHead = L.polylineDecorator(arrow, {
    patterns: [
        {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
    ]
}).addTo(map);

var multiCoords1 = [
  [[47.5468, -0.7910], [48.8068, -0.1318], [49.1242, 1.6699], [49.4966, 3.2958], [51.4266, 2.8564], [51.7542, 2.1093]],
  [[48.0193, -2.8125], [46.3165, -2.8564], [44.9336, -1.0107], [44.5278, 1.5820], [44.8714, 3.7353], [45.8287, 5.1855], [48.1953, 5.1416]],
  [[45.9205, 0.4394], [46.7699, 0.9228], [47.6061, 2.5488], [47.7540, 3.3837]]
];
var plArray = [];
for(var i=0; i<multiCoords1.length; i++) {
  plArray.push(L.polyline(multiCoords1[i]).addTo(map));
}
L.polylineDecorator(multiCoords1, {
  patterns: [
      {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})}
  ]
}).addTo(map);


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


var securityLine3m = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'rgba(255, 99, 71, 0.5)',
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



var acuExis = L.geoJson(null, {
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





$.getJSON("data/acuExis.geojson", function (data) {
  acuExis.addData(data);
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


var enelExis = L.geoJson(null, {
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
$.getJSON("data/enelExis.geojson", function (data) {
  enelExis.addData(data);
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

var alcExis = L.geoJson(null, {
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
$.getJSON("data/alcExis.geojson", function (data) {
  alcExis.addData(data);
});


var etbExis = L.geoJson(null, {
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
$.getJSON("data/etbExis.geojson", function (data) {
  etbExis.addData(data);
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

var gasExis = L.geoJson(null, {
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
$.getJSON("data/gasExis.geojson", function (data) {
  gasExis.addData(data);
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



var landsNetworks = L.geoJson(null, {
  style: function (feature) {
    return {
      color:  Color['landsNetworks'][feature.properties.tipo],
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
          }
        })
        layer.on({
          mouseover: (e) => {highlightFeature(e)
          
          info.update(layer.feature.properties, 'landsNetworks', true)
          },
          mouseout: (e) => {landsNetworks.resetStyle(e.target);
            info.update(layer.feature.properties, 'landsNetworks', false)
          }
        })
        let dateDel =  (feature.properties.ACT==1) ? "24-8-2024" : "Act no Signed"
        layer.bindPopup('<b>' + "UTILITIES LAND" + '</b><p>' + feature.properties.tipo +'</p><br>' + "DeadLine Deliver: " + dateDel); 
        
        
        
      }
    });
    $.getJSON("data/landsNetworks.geojson", function (data) {
      landsNetworks.addData(data);
    });
    
    var cenitColor = {
      "JETDUCTO": "rgb(242, 96, 11)", "POLIDUCTO": "rgb(75, 153, 2)",
      "PROPANODUCTO": "rgb(241, 36, 224)"
    };

    var cenit = L.geoJson(null, {
      style: function (feature) {
        return {
          color: Color['cenit'][feature.properties.RefName],
          weight: 3,
          opacity: 1,
          clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
    
    layer.on({
      mouseover: highlightFeature,
      mouseout: function(e) {
        cenit.resetStyle(e.target);
      }
    });
    
    layer.bindPopup(feature.properties.RefName); 
  }
});


$.getJSON("data/cenit.geojson", function (data) {
  cenit.addData(data);
});






var movExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "rgb(210, 50, 0)",
      weight: 2,
      opacity: 1,
      dashArray: '6, 6',
      dashOffset: '2, 2',
    };
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.RefName); 
}
});
$.getJSON("data/movExis.geojson", function (data) {
  movExis.addData(data);
});

var movProy = L.geoJson(null, {
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
$.getJSON("data/movProy.geojson", function (data) {
  movProy.addData(data);
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

var aremaLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#6412D5',
      weight: 3,
      opacity: 1,
      dashArray: '8, 8',
    };
  }
});
$.getJSON("data/aremaLine.geojson", function (data) {
  aremaLine.addData(data);
});










var landsEFR = L.geoJson(null, {
  style: function (feature) {
    return {
      // color:  "green",
      color:  Color['landsEFR'][feature.properties.EFR_ENTRG],
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
      mouseover: (e) => {highlightFeature(e)
      
      info.update(layer.feature.properties, 'landsEFR', true)
      },
      mouseout: (e) => {landsEFR.resetStyle(e.target);
        info.update(layer.feature.properties, 'landsEFR', false)
      }
    })
       let titleLabel =  (feature.properties.PROPIETARI=="INVIAS") ? "INVIAS LAND " + feature.properties.PARCEL_ID : "EFR LAND " + feature.properties.PARCEL_ID
       let dateDel =  (feature.properties.EFR_ENTRG=="DELIVERED") ? (new Date(feature.properties.DATE_DEL)).toDateString() : "No Delivered"
       
       layer.bindPopup('<b>' + titleLabel + '</b><br>' + "Date Deliver: " + dateDel); 
      }
    });

    $.getJSON("data/landsEFR.geojson", function (data) {
      landsEFR.addData(data);
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
      color: 'gray',
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
  Stations.addData(data);
});

  var legend = L.control({ position: "bottomleft" });
  
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<div id='author_bio_toggle_wrapper' style='display: none'>";
    div.innerHTML +=   "<a href='#0' id='author_bio_wrap_toggle'><span style='font-size:15px'>Hide Legend</span></a>";
    div.innerHTML += "<h4></h4>";
    div.innerHTML += '</div>';
    div.innerHTML += "<span class='author_bio_wrap' style='display: none; background: green'>";
    
    div.innerHTML += '<span class="author_bio_wrap">EFR AND INVIAS LANDS<br>';
  div.innerHTML += '<span class="author_bio_wrap"><span style="color:green; font-size:30px">___</span> Land Delivered</span><br>';
  div.innerHTML += '<span class="author_bio_wrap"><span style="color:red; font-size:30px">___</span> Land No Delivered</span><br>';
  
  div.innerHTML += '<span class="author_bio_wrap"><br>';
  div.innerHTML += '<span class="author_bio_wrap">UTILITIES LANDS<br>';
  
  div.innerHTML += '<span class="author_bio_wrap"><span style="color:#ffff00; font-size:30px">___</span> Only Land</span><br>';
  div.innerHTML += '<span class="author_bio_wrap"><span style="color:#fd9a00; font-size:30px">___</span> Public Land</span><br>';
  div.innerHTML += '<span class="author_bio_wrap"><span style="color:#107BAD; font-size:30px">___</span> Building and Land</span><br>';
  
  // div.innerHTML += '<span class="author_bio_wrap"><i style="background: #E8E6E0"></i>Residential</span><br>';
  // div.innerHTML += '<span class="author_bio_wrap"><i style="background: #FFFFFF"></i>Ice</span><br>';
  div.innerHTML += '</div>';
  
  
  // div.innerHTML += '<span class="author_bio_wrap"><i style="background: #E8E6E0"></i>Residential</span><br>';
  // div.innerHTML += '<span class="author_bio_wrap"><i style="background: #FFFFFF"></i>Ice</span><br>';
  return div;
};



// Add the legend to the map
// legend.addTo(map);



//! LAYER TREE FEATURE (SCRIPT IN lib/layers-tree.js)
// var layer1 = L.marker([4.7, -74.1]).addTo(map);
// var layer2 = L.circle([4.8, -74.2], { radius: 200 }).addTo(map);


var baseTree = [
  {
    label: 'Base Maps',
    children: [
      {label: 'Light Map', layer: cartoLight },
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
                  

                    {label: '0+000 View PKs', layer: pks2, name: 'pks2' },
                    {label: 'Project Line', layer: projectLine, name: 'projectLine'},
                    {label: 'Red Line V2', layer: redLineV2, name: 'redLineV2'},
                    {label: 'RailTrack', layer: railLine, name: 'railLine'},
                    {label: 'Security Line', layer: securityLine3m, name: 'securityLine3m'},
                    {label: 'Environmental Line', layer: environLine, name: 'environLine'},
              
                  ]},
                  {label: 'Utilities Existing', selectAllCheckbox: true, children: [
                    {label: 'Water Supply Exist', layer: acuExis, name: 'acuExis'},
                    {label: 'Energy Exist', layer: enelExis, name: 'enelExis'},
                    {label: 'Drainage Exist', layer: alcExis, name: 'alcExis'},
                    {label: 'Etb Exist', layer: etbExis, name: 'etbExis'},
                    {label: 'Gas Exist', layer: gasExis, name: 'gasExis'},
                    {label: 'Movistar Exist', layer: movExis, name: 'movExis'},
                 
                ]},
                {label: 'Utilities Movements',
                selectAllCheckbox: true, children: [
                  {label: 'Water Supply Mov', layer: acuProy, name: 'acuProy'},
                    {label: 'Energy Proy', layer: enelProy, name: 'enelProy'},
                    {label: 'Drainage Proy', layer: alcProy, name: 'alcProy'},
                    {label: 'Etb Proy', layer: etbProy, name: 'etbProy'},
                    {label: 'Gas Proy', layer: gasProy, name: 'gasProy'},
                    {label: 'Movistar Proy', layer: movProy, name: 'movProy' },
                  ],
                },
                {label: 'Cenit',
                selectAllCheckbox: true, children: [
                  {label: 'Cenit Pipeline', layer: cenit, name: 'cenit' },
                    {label: 'Serv Cenit', layer: cenitServ, name: 'cenitServ' },
                    {label: 'Arema Line', layer: aremaLine, name: 'aremaLine' },
                    
                    ],
                },
                {label: 'Areas',
                selectAllCheckbox: true, children: [
                  {label: 'Lands Utilities', layer: landsNetworks, name: 'landsNetworks' },
                  {label: 'Lands EFR and INVIAS', layer: landsEFR, name: 'landsEFR' },
                  {label: 'Archeology Areas', layer: newArchPol, name: 'newArchPol' },
                  
                  
                ],
              },
                {label: 'Structures',
                selectAllCheckbox: true, children: [
                    {label: 'Bridges', layer: Bridges, name: 'Bridges' },
                    {label: 'Stations', layer: Stations, name: 'Stations' },
                  
                    
                  ],
                },
            ]
        }
        

        //! PROPERTIES PANEL
        
        var info = L.control({
          position: 'bottomleft'
        });
      

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
          return this._div;
        };
        
        
      info.update = function (properties, layer, mousePos) {


          this._div.innerHTML = '<h4>Properties</h4>' 

     if (!mousePos) {

      this._div.innerHTML += ` 'Hover over a Land'`      

     }  else {
          
          if  (properties) {
            
            if (layer=="landsEFR") {

              if(properties.PROPIETARI=="INVIAS"){

                this._div.innerHTML +=  `
                Type: 'INVIAS MAIN CORRIDOR'<br>
                ID: ${properties.PARCEL_ID}<br>
                Status:'No delivered'<br>
                Date Estimated: '31-05-2024'<br>
                `
              } else if(properties.ACT>0) {

                this._div.innerHTML +=  `
                Type: 'EFR LAND'<br>
                ID: ${properties.PARCEL_ID}<br>
                Status:'Delivered'<br>
                Date Delivered: '${(new Date(properties.DATE_DEL)).toDateString()}'<br>
                `
                
              } else {
                
                this._div.innerHTML +=  `
                Type: 'EFR LAND'<br>
                ID: ${properties.PARCEL_ID}<br>
                Status:'No delivered'<br>
                Date Estimated: '31-05-2024'<br>
                `
              }
            }

            if (layer=="landsNetworks") { 

              if(properties.SIGNED > 0){

                
                this._div.innerHTML +=  `
                Type: 'UTILITIES LAND'<br>`

                this._div.innerHTML +=  (properties.tipo=="ONLY LAND" || properties.tipo=="BUILDING AND LAND")? 
                    `Req: ${properties.tipo} (PRIVATE)<br>`  :
                    `Req: ${properties.tipo}<br>`
                
                this._div.innerHTML +=  `Act Signed No.: ${properties.SIGNED}<br>  
                Status:'No delivered'<br>
                Date Estimated: '31-08-2024'<br>
                `
              } else {

                this._div.innerHTML +=  `
                Type: 'UTILITIES LAND'<br>`

                this._div.innerHTML +=  (properties.tipo=="ONLY LAND" || properties.tipo=="BUILDING AND LAND")? 
                    `Req: ${properties.tipo} (PRIVATE)<br>`  :
                    `Req: ${properties.tipo}<br>`
                
                this._div.innerHTML +=  `Act Signed No.: ${properties.SIGNED}<br>  
                Status:'No delivered'<br>
                Date Estimated: '31-06-2025'<br>
                `


              }
            }

          } else {

            this._div.innerHTML +=` 'Hover over a Land'`

          }
            
        }        
           
         
        
        


                      
    };
    info.addTo(map);
                        



//! LEGEND SIDE BAR



  layersMap = overlaysTree.children
                        
    docsId = []
var legendContent = `<h3 class='text-secondary'>Legend</h3>`



for (i= 1;i<layersMap.length;i++){
// 
legendContent += `<div class="accordion accordion-flush bg-red" id="accordionFlushExample">
<div class="accordion-item bg-blue-light">
  <h5 class="accordion-header bg-cyan" id="flush-heading${i}">
    <button class="accordion-button collapsed text-gray-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
    ${layersMap[i].label}:
    </button>
    </h5>
    <div id="flush-collapse${i}"  class="accordion-collapse collapse show" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample${i}">`
   layerLegend = layersMap[i].children

   layerLegend.forEach((e) =>{



     if (layersProps[e.name][3]==="polygon") {

       styleLegend = `background-color: ${layersProps[e.name][1]}` 

      } else if (layersProps[e.name][2]) {
       styleLegend = `border-bottom: 3px dashed ${layersProps[e.name][1]};`
       
    } else {
      styleLegend = `border-bottom: 3px solid ${layersProps[e.name][1]};`


     }

    // styleLegend = `background-color: ${layersProps[e.name][1]}`

  // legendContent += `<div id="${e.name}">${e.label} <span style="color:${layersProps[e.name][1]}"; font-size:50px"></span></div>`  
  legendContent += layersProps[e.name][0]?
  `<div id="${e.name}"> <strong>-${e.label}</strong>`  
 : `<div id="${e.name}"> <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; ${styleLegend} ;"></span> - ${e.label}`  
  // legendContent += `<div id="${e.name}"> <span class="rectangle" style="display: inline-block; width: 100px; height: 5px; border-bottom: 2px dashed black ;"></span> ${e.label} </div>`  
  // legendContent += `<div id="${e.name}"> <span class="rectangle" style="display: inline-block; width: 100px; height: 5px; border-top: 3px solid black; "></span> ${e.label} </div>`  
  
  // add range color
  console.log();

  if (layersProps[e.name][0]) {
        if(e.name == "cenit") {

    legendContent += `<br>JETDUCTO <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; border-bottom: 3px dashed ${Color['cenit']['JETDUCTO']} ;"></span>` 
    legendContent += `<br>POLIDUCTO <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; border-bottom: 3px dashed ${Color['cenit']['POLIDUCTO']} ;"></span>` 
    legendContent += `<br>PROPANODUCTO <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; border-bottom: 3px dashed ${Color['cenit']['PROPANODUCTO']} ;"></span>` 
  }
  
  if(e.name == "landsEFR") {
    
    legendContent += `<br>DELIVERED <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background-color: ${Color['landsEFR']['DELIVERED']} ;"></span>` 
    legendContent += `<br>NO DELIVERED <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background-color: ${Color['landsEFR']['NO DELIVERED']} ;"></span>` 
    
  }
  if(e.name == "landsNetworks") {
    
          legendContent += `<br>BUILDING AND LAND (PRIVATE)<span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background-color: ${Color['landsNetworks']['BUILDING AND LAND']} ;"></span>` 
          legendContent += `<br>ONLY LAND (PRIVATE)<span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background-color: ${Color['landsNetworks']['ONLY LAND']} ;"></span>` 
          legendContent += `<br>PUBLIC ZONE<span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background-color: ${Color['landsNetworks']['PUBLIC ZONE']} ;"></span>` 
          
         }

  } 

legendContent +=  " </div>"

// sali = Object.getOwnPropertyNames(sal)


})

// console.log(projectLine);
legendContent += `<br>`
legendContent += `</div>`


legendContent +=      `</div>
</div> `
}

legendContent += `</div>`





// Update the legend div with the content
document.getElementById('legend').innerHTML = legendContent;


function updateLegend() {

  layersMap = overlaysTree.children
  
  
  for (i= 1;i<layersMap.length;i++){
    
    layerLegend = layersMap[i].children
    
    layerLegend.forEach((e) =>{
      
      
      
      docsId[e.name] = document.getElementById(e.name)

  document.getElementById(e.name).style.display = map.hasLayer(e.layer) ? 'block' : 'none';
})

}
}


map.on('layeradd layerremove', function() {
  
  
  updateLegend();
});

// Initially update legend
updateLegend();

// console.log(map);

jQuery(document).ready(function($)
{
  $(".legend-title").click(function(){
    console.log(`pasoos`);
    $('.legend').css("display","none");
    $('#map').css("position","absolute");
    console.log($(".legend-title").text());
    if ($(".legend-title").text() == "HIDE LEGEND")
      {			
        $(".legend-title").html("EXPAND LEGEND")
      }
      else{
        
        $(".legend-title").text("HIDE LEGEND")
        $('.legend').css("display","block");
        $('#map').css("position","relative");
        

      }
      
})
$(".layer-title").click(function(){
  $('.leaflet-control-layers').css("display","none");
  if ($(".layer-title").text() == "HIDE LAYERS")
    {			
      $(".layer-title").html("EXPAND LAYERS")
    }
    else{

      $(".layer-title").text("HIDE LAYERS")
      $('.leaflet-control-layers').css("display","block");

    }
})


})



// map.addLayer(landsEFR)
// map.addLayer(cenit)
// map.addLayer(landsNetworks)

// console.log(layersProps);