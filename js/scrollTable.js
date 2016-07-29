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
                  $('<th></th>').text("time sig").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("tempo").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("measures").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("name").addClass("col-xs-3"))))
          .append(
            $('<tbody></tbody>'))));

});

// utility function to add elements to table
// 
// arguments: data
// Type: javascript object
// object with 4 properties, "timesig", "tempo", "count", "section"
function addRow(data) {
  var row = $('<tr></tr>');
  for(var prop in data) {
    // create td with class col-xs-3
    row.append( $('<td></td>').text(data[prop]).addClass("col-xs-3"));
  }
  // add row to tbody
  $("#metro-table tbody").append(row);
}

// utility function to fill table with sample data
function genTable(obj) {
  for(var sec in obj) {
    addRow(obj[sec]);
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
