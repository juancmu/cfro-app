

console.log(sectionParam2);
// console.log(areas);
// console.log(data);


console.log(pk_ini);
console.log(pk_end);







currentDate = new Date()
groupByAttribute = (data, attribute) => {
    domainAtt = []
  return data.reduce((acc, obj) => {
    const key = obj[attribute];
    if (!acc[key]) {
    
      domainAtt.push(key);
      acc[key] = [];
  }
  return acc;
  }, {});
}

maxJsonDateDel =  (json, vDate) =>{
    
    var firstDate = json[0][vDate];

      for (let i = 0; i < json.length-1; i++) {
   
          if (firstDate) { 
          var date2 = json[i+1][vDate];
        firstDate = (firstDate<date2)? date2 : firstDate
          }
      }
  

      dateFormated = formatDate(firstDate)
      return dateFormated
}  


formatDate = (firstDate) =>{
  var date = new Date(firstDate);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based index
  var day = ('0' + date.getDate()).slice(-2);

  var formattedDate = year + '-' + month + '-' + day;
return formattedDate

}

let prsArray = (prsNumber) => {
  

  prs = Math.round(prsNumber).toString()
  prsLength = prs.length;
  prsText = { "1": "0+00" + prs,
              "2": "0+0" + prs,
              "3": "0+" + prs,
              "4": prs.substring(0, 1) + "+" + prs.substring(1, 5),
              "5": prs.substring(0, 2) + "+" + prs.substring(2, 5)
    } ; 
return  prsText[prsLength];
}


if (pk_ini == 0 && pk_end == 39660) { titleText = `<h3>Issues All Corridor` } else {

  titleText = `<h3>ISSUES BETWEEN PKS ${prsArray(pk_ini)} - ${prsArray(pk_end)}` 
        if (sectionParam2<=18) {  titleText += ` SECTION ${sectionParam2}`}

}
                   
titleText += `</h3>`

document.getElementById("titleText").innerHTML = titleText

var tableHtml =
  '<table border="5px"  class="bg-secondary w-100" id="main-table">';


dataAreasDB = [];
OKArea = [];
areasOp = areas.filter((element) => element.sectionInfo === true);


areasOp.forEach((e) => {
  dataAreasDB[e.area] = data.filter((element) => element.area == e.area);

  OKArea[e.area] = dataAreasDB[e.area].filter((el) => el.state == 'NO');
  

  
  tableHtml += `<tr>
  
  <td><h4 class="text-${e.coloricon}">${e.area}</button></h4></td>`


  tableHtml += (OKArea[e.area].length > 0) ? `<td class="text-danger">` : `<td class="text-success">` 
  tableHtml += `Number of ${e.spec}: ${dataAreasDB[e.area].length}</td>`

  tableHtml += (dataAreasDB[e.area].length> 0) ? `<td><button class="btn bd-${e.coloricon}" onclick="toggleCellVisibility('${e.area}')"><h6> Details </h6></td></tr>` :
  
  `<td>No details</td>`
  
  
  
  tableHtml += `<td colspan="3" class="text-end">
  
  <table class="table bd-${e.coloricon} w-100 text-end" id="${e.area}" style="display: none;">`;
  
  if (e.area === "Environmental") {
    
    tableHtml += `<tr>
 <td class="w-50 text-danger">Waiting Environmental License Approval</td>
    </tr>`
  }
  
  if (e.area === "Social") {

    tableHtml += `<tr>
    <th><h5>ACTIVITY</h5></th>
    <th><h5>NUMBER OF ACTIVITIES</h5></th>
    <th><h5>DATE ESTIMATE TO EXECUTION</h5></th>
    <th><h5>MAPS</h5></th>
    <th><h5>DOCUMENTATION</h5></th>
    </tr>`
    groupByAttribute( dataAreasDB['Social'], 'type');

    typeSocial = domainAtt
 

    typeSocial.forEach((el) => {
      
      interferences = dataAreasDB[e.area].filter(
        (element) => element.type == el
        );
        if (interferences.length > 0) {
          
          // last date
          
          
          
          tableHtml += `<tr class="`
          
          
          tableHtml += (new Date(maxJsonDateDel(interferences, 'date_e'))< currentDate) ?  `text-success">` :  `text-danger">`
          
          tableHtml += `<td><h6>${el}</h6></td>
          <td>${interferences.length}</td>
          <td 
          >${maxJsonDateDel(interferences, 'date_e')}</td>
          <td>Go to map</td>
          <td>Go to Docs</td>
          </tr>`;
        }
      });

 
  }

  
  

  if (e.area === "Utilities") {
    
    tableHtml += `<tbody style="text-align:right;">
    <tr>
    <th><h5>COMPANY</h5></th>
    <th><h5>NUMBER OF INTERFERENCES</h5></th>
    <th><h5>DATE ESTIMATE TO APPROVAL</h5></th>
    <th><h5>MAPS</h5></th>
    <th><h5>DOCUMENTATION</h5></th>
    </tr>`
    
    groupByAttribute( dataAreasDB['Utilities'], 'obs'); 
    typeNetwork = domainAtt
    typeNetwork.forEach((el) => {
      
      interferences = dataAreasDB[e.area].filter(
        (element) => element.obs == el
        );
        if (interferences.length > 0) {
          
          // last date
          
          
          
          tableHtml += `<tr class="`
          
          
          tableHtml += (new Date(maxJsonDateDel(interferences, 'date_e'))< currentDate) ?  `text-success">` :  `text-danger">`
          
          tableHtml += `<td><h6>${el}</h6></td>
          <td>${interferences.length}</td>
          <td 
          >${maxJsonDateDel(interferences, 'date_e')}</td>
          <td>Go to map</td>
          <td>Go to Docs</td>
          </tr>`;
        }
      });
      
    } 

  if (e.area === "Permits") {

      tableHtml += `<tr>
      <th><h5>ACTIVITY</h5></th>
      <th><h5>NUMBER OF ACTIVITIES</h5></th>
      <th><h5>DATE ESTIMATE TO EXECUTION</h5></th>
      <th><h5>MAPS</h5></th>
      <th><h5>DOCUMENTATION</h5></th>
      <th><h5>DETAILS</h5></th>
      </tr>`
      groupByAttribute( dataAreasDB[e.area], 'type');
  
      typePermits = domainAtt

      typePermits.forEach((el) => {
      
        interferences = dataAreasDB[e.area].filter(
          (element) => element.type == el
          );
          if (interferences.length > 0) {
            
            // last date
            
            
            
            tableHtml += `<tr class="`
            
            
            tableHtml += (new Date(maxJsonDateDel(interferences, 'date_e'))< currentDate) ?  `text-success">` :  `text-danger">`
            
            tableHtml += `<td><h6>${el}</h6></td>
            <td>${interferences.length}</td>
            <td 
            >${maxJsonDateDel(interferences, 'date_e')}</td>
            <td>Go to map</td>
            <td>Go to Docs</td>
            <td><button class="btn bg-${e.coloricon}" onclick="toggleCellVisibility('permits-${el}')"><h6> Details </h6></td>
            </tr>`;
            tableHtml += `<tr class="table-borderless"><td colspan="5" class="text-end">`
            tableHtml += `<table class="table bd-$e.coloricon} w-100 text-end table-borderless" id="permits-${el}" style="display: none;">`
       
            tableHtml +=  `<tr>

             <th><h6>Name</h6></th>
             <th><h6>Location</h6></th>
             <th><h6>Estimate Date of Execution</h6></th>
             <th><h6>Maps</h6></th>
             <th><h6>Docs</h6></th>
             </tr>`
             
             dataAreasDB['Permits'].forEach((e) => { 
               
                        
                        
                if (e.type == el) {
                  tableHtml += `<tr class="`
                  tableHtml += (new Date(formatDate(e.date_e))< currentDate) ?  `text-success">` :  `text-danger">`
                  tableHtml +=   `<td>${e.obs}</td>`
                  tableHtml +=   `<td>${prsArray(e.pk_ini)} - ${prsArray(e.pk_end)}</td>`

                  tableHtml +=   `<td>${formatDate(e.date_e)}</td>`
                  tableHtml +=   `<td>Go to map</td>`
                  tableHtml +=   `<td>Go to Docs</td>`
                  tableHtml +=   `</tr>`;

                } 

              })

            tableHtml += `</table></tr>`

          }
        });
  }

  if (e.area === "Lands") {

    tableHtml += `<tr>
                    <th><h5>TYPE LAND</h5></th>
                    <th><h5>NUMBER OF LANDS</h5></th>
                    <th><h5>DATE ESTIMATE TO DELIVER</h5></th>
                    <th><h5>MAPS</h5></th>
                    <th><h5>DOCUMENTATION</h5></th>
                    <th><h5>DETAILS</h5></th>
                    </tr>`

                    groupByAttribute( dataAreasDB['Lands'], 'type');
                    typeLand = domainAtt
                    
                    typeLand.forEach((el) => {
                        typeLandFiltered = dataAreasDB[e.area].filter(
                            (element) => element.type == el
                            );

                            tableHtml += `<tr class="`
                     
               
                            tableHtml += (new Date(maxJsonDateDel(typeLandFiltered, 'date_a'))< currentDate) ?  `text-success">` :  `text-danger">`

                          tableHtml += `<td class="w-25" >`
                          
                          tableHtml += (el == "Red_line") ? `<h6>Project Lands</h6></td>` : `<h6>Utilities Lands</h6></td>`

                          tableHtml += `<td>${typeLandFiltered.length}</td>`

                            if (el == 'Red_line') {

                             tableHtml +=    `<td>${maxJsonDateDel(typeLandFiltered, 'date_a')}</td>`
                            }    else {
                                tableHtml +=    `<td>${maxJsonDateDel(typeLandFiltered, 'date_e')}</td>`
                                
                            }

                            tableHtml += `
                            <td>Go to map</td>
                            <td>Go to Docs</td>
                            <td><button class="btn bg-${e.coloricon}" onclick="toggleCellVisibility('lands-${el}')"><h6> Details </h6></td>
                            </tr>`
                            tableHtml += `<tr class="table-borderless"><td colspan="5" class="text-end">`
  
                            efrLands = typeLandFiltered.filter( (element) => element.obs == "EFR" );
                            inviasLands = typeLandFiltered.filter( (element) => element.obs == "INVIAS" );
                            eaabLands = typeLandFiltered.filter( (element) => element.obs == "EAAB" );
                            publicLands = typeLandFiltered.filter( (element) => element.obs == "PUBLIC ZONE" );
                            buildingLands = typeLandFiltered.filter( (element) => element.obs == "BUILDING AND LAND" );
                            onlyLands = typeLandFiltered.filter( (element) => element.obs == "ONLY LAND" );

                                               

                            tableHtml += `<table class="table bd-$e.coloricon} w-100 text-end table-borderless" id="lands-${el}" style="display: none;">`
                            

                             if ( efrLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-success"><td class="table-borderless w-50">EFR LANDS</td><td class="table-borderless"  colspan="6">${efrLands.length} Lands</td><td class"w-25" >Last Date Delivery : ${maxJsonDateDel(efrLands, 'date_a')}</td></tr>`
                             }
                             if ( inviasLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-danger"><td class="table-borderless w-50">INVIAS LANDS</td><td class="table-borderless"  colspan="6">${inviasLands.length} Lands</td><td class"w-25" >Estimate Date Delivery : ${maxJsonDateDel(inviasLands, 'date_a')}</td></tr>`
                             }
                             if ( eaabLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-danger"><td class="table-borderless w-50">EAAB LANDS</td><td class="table-borderless"  colspan="6">${eaabLands.length} Lands</td><td class"w-25" >Estimate Date Delivery : ${maxJsonDateDel(eaabLands, 'date_a')}</td></tr>`
                             }
                             if ( buildingLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-danger"><td class="table-borderless w-50">Building and Land</td><td class="table-borderless"  colspan="6">${buildingLands.length} Lands</td><td class"w-25" >Estimate Date Delivery : ${maxJsonDateDel(buildingLands, 'date_a')}</td></tr>`
                             }
                             if ( publicLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-danger"><td class="table-borderless w-50">Public Zones</td><td class="table-borderless"  colspan="6">${publicLands.length} Lands</td><td class"w-25" >Estimate Date Delivery : ${maxJsonDateDel(publicLands, 'date_a')}</td></tr>`
                             }
                             if ( onlyLands.length > 0) {
                              tableHtml += `<tr class="table-borderless text-danger"><td class="table-borderless w-50">Only Lands</td><td class="table-borderless"  colspan="6">${onlyLands.length} Lands</td><td class"w-25" >Estimate Date Delivery : ${maxJsonDateDel(onlyLands, 'date_a')}</td></tr>`
                             }
    
                              tableHtml += `</table></td></tr>`;

                    })
 }

 
 if (e.area === "Bridges") {
    
  tableHtml += `<tbody style="text-align:right;">
  <tr>
  <th><h5>BRIDGE</h5></th>
  <th><h5>LOCATION</h5></th>
  <th><h5>DATE ESTIMATE TO APPROVAL</h5></th>
  <th><h5>MAPS</h5></th>
  <th><h5>DOCUMENTATION</h5></th>
  </tr>`

  dataAreasDB[e.area].forEach((e) => {

  tableHtml += `<tr class="`
          
    
  tableHtml += (new Date(formatDate(e.date_e))< currentDate) ?  `text-success">` :  `text-danger">`

  tableHtml += `<td><h6>${e.id_area}</h6></td>
  <td>${prsArray(e.pk_ini)} - ${prsArray(e.pk_end)}</td>

  <td 
  >${formatDate(e.date_e)}</td>
  <td>Go to map</td>
  <td>Go to Docs</td>
  </tr>`;

  })
 }

 if (e.area === "Stations") {
    
  tableHtml += `<tbody style="text-align:right;">
  <tr>
  <th><h5>STATION</h5></th>
  <th><h5>LOCATION</h5></th>
  <th><h5>DATE ESTIMATE TO APPROVAL</h5></th>
  <th><h5>MAPS</h5></th>
  <th><h5>DOCUMENTATION</h5></th>
  </tr>`

  dataAreasDB[e.area].forEach((e) => {


  tableHtml += `<tr class="`
          
    
  tableHtml += (new Date(formatDate(e.date_e))< currentDate) ?  `text-success">` :  `text-danger">`

  tableHtml += `<td><h6>${e.id_area}</h6></td>
  <td>${prsArray(e.pk_ini)} - ${prsArray(e.pk_end)}</td>

  <td 
  >${formatDate(e.date_e)}</td>
  <td>Go to map</td>
  <td>Go to Docs</td>
  </tr>`;

  })
 }
  tableHtml += ` </tbody></table>`;

  tableHtml += `</td>`;

  // })

  tableHtml += `<tr>`;
  tableHtml += `</tr>`;
});
// //     </tr>



tableHtml += "</table>";


document.getElementById("tableContainer").innerHTML = tableHtml;



function toggleCellVisibility(tableNested) {
  // var cell1 = document.getElementById("optionsCell");
  var cell2 = document.getElementById(tableNested);

  // Toggle visibility
  if (cell2.style.display == "none") {
    cell2.style.display = "block";
  } else {
    cell2.style.display = "none";
  }
}

