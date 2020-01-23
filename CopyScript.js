"use strict";

let worksheet;

tableau.extensions.initializeAsync().then(() => {
  worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(ws => ws.name === "Sheet 23");
  worksheet.addEventListener(tableau.TableauEventType.FilterChanged, getData);
  worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, getData);
  getData();
});

function getData() {
  worksheet.getSummaryDataAsync().then(dataTable => {
    let field = dataTable.columns.find(
      column => column.fieldName === "SerialNumber"
    );
    let values = [];
    for (let row of dataTable.data) {
      values.push(row[field.index].value);
    }
    document.getElementById("CopyBtn").disabled = values.length > 500;
    let copyText = values.join("\n");

    $("#ExtractedValues").empty();
    $("#ExtractedValues").append(copyText);
  });
}

function CopyToClipboard(element) {
  var $temp = $("<textarea>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
