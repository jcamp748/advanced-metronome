document.addEventListener('form complete', function(event) {
  // create a table element
  //console.log("create table");
  //var table = document.createElement("table");
  //var form = document.getElementById("form-wrapper");
  //form.appendChild(table);
  $("#form-wrapper").children().first().append(
      $('<div></div>').addClass("col-md-8").append(
        $('<table></table>')
          .attr("id", "metro-table")
          .addClass("table table-striped")
          .append(
            $('<thead></thead>').append(
              $('<tr></tr>')
                .append(
                  $('<th></th>').text("time sig").addClass("col-xs-2"))
                .append(
                  $('<th></th>').text("tempo").addClass("col-xs-2"))
                .append(
                  $('<th></th>').text("measures").addClass("col-xs-2"))
                .append(
                  $('<th></th>').text("name").addClass("col-xs-2"))
                .append(
                  $('<th></th>').text("loop").addClass("col-xs-2"))))
          .append(
            $('<tbody></tbody>'))));
  // add bootstrap checkbox for looping
  $("#form-wrapper div[class='col-md-8']").append(
    $('<div></div>').addClass("checkbox").append(
      $('<label></label>')
        .append(
          $("<input>")
            .attr("type", "checkbox")
            .attr("id", "loop-checkbox"))));
  $("#form-wrapper div[class='col-md-8'] label").append("Loop");

  // add bootstrap checkbox for lead in 
  $("#form-wrapper div[class='col-md-8']").append(
    $('<div></div>').addClass("checkbox").append(
      $('<label></label>')
        .append(
          $("<input>")
            .attr("type", "checkbox")
            .prop("checked", true)
            .attr("id", "lead-checkbox"))));
  $("#form-wrapper div[class='col-md-8'] label").append("Lead In");
});

// add jquery row to section table
function addRow($row) {
  // add row to tbody
  $("#metro-table tbody").append($row);
}

function updateRow(data) {
  // find the current row 
  console.log("update row");
  var $row = $(".highlight");
  $row.children(":nth-child(1)").text(data.timesig);
  $row.children(":nth-child(2)").text(data.tempo);
  $row.children(":nth-child(3)").text(data.count);
  $row.children(":nth-child(4)").text(data.section);
  updatePlayData();
}

// utility function to create section data from a
// jquery object
function genSection($button) {
  $row = $button.parent();
  var sec = {};
  sec.section = $row.prev().text();
  sec.count = $row.prev().prev().text();
  sec.tempo = $row.prev().prev().prev().text();
  sec.timesig = $row.prev().prev().prev().prev().text();
  return sec;
}

// generate markup for a table row from a section object
function genRow(data) {
  if( data.section === "lead in" ) return;
  var $row = $('<tr></tr>');
  $row.attr("onclick", "editSection(this)");
  for(var prop in data) {
    // create td with class col-xs-3
    $row.append( $('<td></td>').text(data[prop]).addClass("col-xs-3"));
  }
  // add include button
  $row.append( $('<td></td>').append(
    $('<button></button>').attr("type", "button")
      .addClass("btn btn-secondary add-section")
      .attr("onclick", "addSection(this)")
      .text("remove")));
  return $row;
}

// utility function to get the index of the current row
function getIndex($row) {
  var $table = $("#metro-table tbody");
  var index = 0;
  $.each( $table.children(), function(ndx, element) {
    if( $(this).is($row) ) {
      index = ndx;
      // break out of the loop
      return false;
    }
  });
  return index;
}

// utility function to fill table with sample data
function genTable(obj) {
  for(var sec in obj) {
    addRow(genRow(obj[sec]));
  }
}

// utility function to clear table
function clearTable() {
  // delete all elements under tbody
  $("#metro-table tbody").empty();
}

// utility function to highlight a row
function highlightRow(row) {
  $("#metro-table tbody").children(":nth-child(" + row.toString() + ")").toggleClass("highlight");
}
