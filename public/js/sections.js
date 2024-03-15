console.log(sectionParam2);
console.log(areas);
console.log(data);

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
    

    

    var currentDate = json[0][vDate];


    
      for (let i = 0; i < json.length-1; i++) {
   
          if (currentDate) { 
          var date2 = json[i+1][vDate];
        currentDate = (currentDate<date2)? date2 : currentDate
          }
      }
      var date = new Date(currentDate);

      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based index
      var day = ('0' + date.getDate()).slice(-2);

      var formattedDate = year + '-' + month + '-' + day;

      return formattedDate 
}  


var tableHtml =
  '<table border="5px"  class="bg-secondary w-100" id="main-table">';


dataAreasDB = [];
areasOp = areas.filter((element) => element.sectionInfo === true);

areasOp.forEach((e) => {
  dataAreasDB[e.area] = data.filter((element) => element.area == e.area);

  tableHtml += `<tr>

     <td><h4 class="text-${e.coloricon}">${e.area}</button></h4></td>
     <td>Number of ${e.spec}: ${dataAreasDB[e.area].length}</td>
     <td><button onclick="toggleCellVisibility('${e.area}')"><h6> Details </h6></td>
     </tr>

     <td colspan="3" class="text-end">

    <table class="bd-${e.coloricon} w-100 text-end" id="${e.area}" style="display: none;">`;

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

            
        tableHtml += `<tr>
                        <td><h6>${el}</h6></td>
                        <td>${interferences.length}</td>
                        <td>${maxJsonDateDel(interferences, 'date_e')}</td>
                        <td>Go to map</td>
                        <td>Go to Docs</td>
                      </tr>`;
      }
    });
  }

  if (e.area === "Lands") {

    tableHtml += `<tbody style="text-align:right;">
                    <tr>
                    <th><h5>TYPE LAND </h5></th>
                    <th><h5>NUMBER OF LANDS</h5></th>
                    <th><h5>DATE ESTIMATE TO DELIVER</h5></th>
                    <th><h5>MAPS</h5></th>
                    <th><h5>DOCUMENTATION</h5></th>
                    </tr>`

                    groupByAttribute( dataAreasDB['Lands'], 'type');
                    typeLand = domainAtt
                    
                    typeLand.forEach((el) => {
                        typeLandFiltered = dataAreasDB[e.area].filter(
                            (element) => element.type == el
                            );
                            
                            console.log(typeLandFiltered);

                          tableHtml += `
                          <tr>
                           <td>${el}</td>
                           <td>${typeLandFiltered.length}</td>`

                            if (el == 'Red_line') {

                             tableHtml +=    `<td>${maxJsonDateDel(typeLandFiltered, 'date_a')}</td>`
                            }    else {
                                tableHtml +=    `<td>${maxJsonDateDel(typeLandFiltered, 'date_e')}</td>`
                                
                            }
                            
                            tableHtml += `</tr></tbody>`


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

