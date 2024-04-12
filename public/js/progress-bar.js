dataAreasDB = [];
OKArea = [];

var areasOp = areas.filter((element) => element.sectionInfo === true);

tableHtml = `<div class="bg-secondary rounded h-100 p-4">
    <h6 class="mb-4">Progress Advances Areas (Aprovals) </h6>`;

areasOp.forEach((e) => {
  dataAreasDB[e.area] = data.filter((element) => element.area == e.area);

  OKArea[e.area] = dataAreasDB[e.area].filter((el) => el.state == "YES");

  tableHtml += `<div class="pg-bar mb-2 container">
                    <div class="row" >
                        ${e.area}
                    </div>
                    <div class="progress size-bar progress-value row">
                        <div class="value"><h3 class="text-warning">`;
  console.log((OKArea[e.area].length / dataAreasDB[e.area].length) * 100);
  salida = ((OKArea[e.area].length / dataAreasDB[e.area].length) * 100).toFixed(
    2
  );
  tableHtml += OKArea[e.area].length > 0 ? `${salida}%` : `0%`;

  tableHtml += `</h3></div>
            <div class="progress-bar progress-bar-striped   
            bg-${e.coloricon}" role="progressbar"`;

  tableHtml +=
    OKArea[e.area].length > 0
      ? `aria-valuenow="${
          (OKArea[e.area].length / dataAreasDB[e.area].length) * 100
        }"`
      : `aria-valuenow="3"`;

  tableHtml += ` aria-valuemin="0" aria-valuemax="100"></div>

        </div>
    </div>`;
});

tableHtml += `</div></div>`;

document.getElementById("progress-bar-2").innerHTML = tableHtml;
