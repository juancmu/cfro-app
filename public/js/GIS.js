var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

var cartoColor = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

// var usgsImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// });




const highlightOn = (feature, layer, nameLayer) =>
  {
     layer.on({
      mouseover:  function(e) {
                    var layer = e.target;
                    layer.setStyle({
                    weight: 8, // Adjust these styles as needed
                    color: 'rgb(7, 224, 249)', // Change the color to your highlight color
        });
      },
      mouseout: function(e) {
      nameLayer.resetStyle(e.target);
  }
     });
}


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
  muni2.addData(data);
});



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
    
            highlightOn(feature,layer,newArchPol)           
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
  gasExist.addData(data);
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
          }
      })
     highlightOn(feature,layer,landsNetworks)
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
    
    highlightOn(feature,layer,cenit2022)

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








function landsTableInfo(feature, layer) {
  if (feature.properties) {

    pkSI = feature.properties.PK_INI.split(",");
      pkSF = feature.properties.PK_END.split(",");

     let prsArray = (prs, prsLenglth) => {
        prsText = { "1": "0+00" + prs,
                    "2": "0+0" + prs,
                    "3": "0+" + prs,
                    "4": prs.substring(0, 1) + "+" + prs.substring(1, 5),
                    "5": prs.substring(0, 2) + "+" + prs.substring(2, 5)
          } ; 
      return  prsText[prsLenglth];
    }
// asign date delivered
      (feature.properties.DATE_DEL == null) ? dateDelShort = "No Delivered" : dateDelShort = new Date(feature.properties.DATE_DEL).toString().substring(0, 16)

      var landsColors = {
        "NO DELIVERED": "red", "NO DELIVERED ONLY LAND": "#ECAAF1", "DEMOLISHED": "#6e6e6e", "DELIVERED ONLY LAND": "#9ace00",
        "DELIVERED LIST TO DEMOLISH": "GREEN"
      };

    var content = `<table class='table table-striped table-bordered table-condensed'>
    <tr><th>ID</th><td>          ${feature.properties.PARCEL_ID}  </td></tr>
    <tr><th>MUNICIPALITY</th><td>${feature.properties.MUNICIPIO}  </td></tr>
    <tr><th>LAND AREA</th><td>   ${feature.properties.LAND_AREA}  </td></tr>
    <tr><th>BUILT AREA</th><td>  ${feature.properties.BUILT_AREA} </td></tr>
    <tr><th>PKS</th><td>  ${prsArray(pkSI[0], pkSI[0].length)} - ${prsArray(pkSF[0], pkSF[0].length)} </td></tr>

    <tr><td><img class='img-parcel' width='250' src='assets/img/parcels/${feature.properties.PARCEL_ID}_01.jpg'></td>
    <td><img class='img-parcel' width='250' src='assets/img/parcels/${feature.properties.PARCEL_ID}_RG.jpg'></td></tr>
    <tr><th>DELIVERED DATE</th><td>${dateDelShort}</td></tr>
    <tr><th>STATUS</th><td bgcolor='${landsColors[feature.properties.ESTADO]}'>${feature.properties.ESTADO}</td></tr>

    <table>`;


    layer.on({
      click: function (e) {
        $("#feature-title").html(feature.properties.PARCEL_ID);
        $("#feature-info").html(content);
        $("#featureModal").modal("show");

      }
    });
  }
  layer.on({
    mouseover: function (e) {
      var layer = e.target;
      layer.setStyle({
        weight: 3,
        color: "#00FFFF",
        opacity: 1
      });
      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    },
    mouseout: function (e) {
      var dd = []
            landINVIAS = 2
      dd = [landsEFR,landINVIAS]
       console.log(dd); 
      dd[0].resetStyle(e.target);
    }
  });
}




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
      
      highlightOn(feature, layer, landsEFR);
 
      // POPUP INFO
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
  Stations.addData(data);
});


function onMapClick(e) {
  // Get latitude and longitude of the clicked point
  var lat = e.latlng.lat.toFixed(6);
  var lng = e.latlng.lng.toFixed(6);

  var streetViewLink = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + lat + ',' + lng;

  L.popup()
      .setLatLng(e.latlng)
      .setContent(`<a href='${streetViewLink}' target='_blank'>View in Street View</a>`)
      .openOn(map);
  // Construct Street View link

  // Open Street View link in a new window
  // window.open(streetViewLink);
}

map.on('click', onMapClick);
  // Create the legend control


  let panorama;

  function initialize() {
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: { lat: 37.86926, lng: -122.254811 },
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      },
    );
  }
  
  window.initialize = initialize;

var legend = L.control({ position: "bottomleft" });

var prueba = L.control({ position: "bottomright" });

prueba.onAdd = function(map) {

  var div2 = L.DomUtil.create("div", "legend");

 div2.innerHTML += "<div style='display: block'>pruba</div>";
 return div2;
}

console.log(prueba);
prueba.addTo(map);

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<div id='author_bio_toggle_wrapper' style='display: none'>";
  div.innerHTML +=   "<a href='#0' id='author_bio_wrap_toggle'><span style='font-size:15px'>Hide Legend</span></a>";
  div.innerHTML += "<h4></h4>";
  div.innerHTML += '</div>';
  div.innerHTML += "<div class='author_bio_wrap' style='display: none; background: green'>";
  
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
legend.addTo(map);



jQuery(document).ready(function($)
{
  $(".legend-title").click(function(){
    $('.leaflet-control-layers').css("display","none");
    if ($(".legend-title").text() == "HIDE LAYERS")
      {			
        $(".legend-title").html("EXPAND LAYERS")
      }
      else{

        $(".legend-title").text("HIDE LAYERS")
        $('.leaflet-control-layers').css("display","block");

      }

})




  $("#author_bio_wrap_toggle").click(function()
  {
    
    $(".author_bio_wrap").slideToggle( "slow");
    $('.legend').css("background-color","transparent");
    $('.legend').css("transform","translateY(100px)");

   
    // $('.leaflet-control-layers').removeClass('leaflet-control-layers').addClass('green');
    

    // $(".legend").slideToggle( "slow");
    
	  if ($("#author_bio_wrap_toggle").text() == "Hide Legend")
      {			
        $("#author_bio_wrap_toggle").html("Expand Legend")
        $("#author_bio_wrap_toggle").css("font-size","15px");
        $("#author_bio_wrap_toggle").css("background-color"," rgba(218, 204, 204, 0.8)");
        $('.leaflet-control-layers').css("display","block");
        
  
        // $('.legend').css("height","250px");
      }
	  else 
      {		
        $("#author_bio_wrap_toggle").text("Hide Legend")
        $("#author_bio_wrap_toggle").css("font-size","15px");
        $('.legend').css("background-color"," rgba(218, 204, 204, 0.8)");
        $('.legend').css("transform","translateY(-50px)");
      }
    
  });  
  

  $("#featureModal").on("hidden.bs.modal", function (e) {
    $(document).on("mouseout", ".feature-row", clearHighlight);
  });
});

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
                  

                    {label: '0+000 View PKs', layer: pks2, color:'red'},
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



var lay = L.control.layers.tree(baseTree, overlaysTree,
            {
                namedToggle: true,
                selectorBack: false,
                closedSymbol: '&#8862; &#x1f5c0;',
                openedSymbol: '&#8863; &#x1f5c1;',
                collapseAll: 'Collapse all',
                expandAll: 'Expand all',
                collapsed: false,
            });

        lay.addTo(map).collapseTree().expandSelected().collapseTree(true);
        L.DomEvent.on(L.DomUtil.get('onlysel'), 'click', function() {
            lay.collapseTree(true).expandSelected(true);
        });

