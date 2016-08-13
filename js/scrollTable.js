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
  var $rowDiv = $('<div></div>').addClass("row");
  var $checkbox = null;
  $checkbox = $('<div></div>').addClass("checkbox col-xs-3").attr("id", "loop-div");
  $checkbox.append(
    $('<label></label>')
      .append(
        $("<input>")
          .attr("type", "checkbox")
          .attr("id", "loop-checkbox")));
  $checkbox.children("label").append("Loop");
  $rowDiv.append($checkbox);

  // add bootstrap checkbox for lead in 
  $checkbox = $('<div></div>').addClass("checkbox col-xs-3").attr("id", "lead-in-div");
  $checkbox.append(
    $('<label></label>')
      .append(
        $("<input>")
          .attr("type", "checkbox")
          .prop("checked", true)
          .attr("id", "lead-checkbox")));
  $checkbox.children("label").append("Lead In");
  $rowDiv.append($checkbox);

  // add bootstrap button for add row before
  var $button = $('<button></button>').attr("type", "button").attr("disabled", true).addClass("btn btn-primary table-button");
  $button.text("Add Row Before").attr("onclick", "addRowBefore()");
  $rowDiv.append($button);

  // add bootstrap button for add row after 
  $button = $('<button></button>').attr("type", "button").attr("disabled", true).addClass("btn btn-primary table-button");
  $button.text("Add Row After").attr("onclick", "addRowAfter()");
  $rowDiv.append($button);
  
  // add row to the page
  $("#form-wrapper div[class='col-md-8']").append($rowDiv);
});

// called when user clicks add row before button
function addRowBefore() {
  var index = getIndex( $("tr.highlight") );
  var nrow = { timesig: "4/4", tempo: "120", count: "4", section: "my section" };
  var data = metronomeData;
  var ndata = {};
  var offset = 0;
  var length = Object.keys(data).length;
  for( var i = 0; i < length + 1; i++ ) {
    if( i !== index ) {
      var sec = data[i + offset];
      ndata[i] = sec;
    } else {
      ndata[i] = nrow;
      offset = -1;
    }
  }
  metronomeData = ndata;
  genTable(metronomeData);
}

// called when user clicks add row after button
function addRowAfter() {
  var index = getIndex( $("tr.highlight") );
  var $row = genRow(null);
  var data = metronomeData;
  console.log("add row after: " + index );
}

// add jquery row to section table
function addRow($row) {
  // add row to tbody
  $("#metro-table tbody").append($row);
}

function updateRow(data) {
  // find the current row 
  var $row = $(".highlight");
  $row.children(":nth-child(1)").text(data.timesig);
  $row.children(":nth-child(2)").text(data.tempo);
  $row.children(":nth-child(3)").text(data.count);
  $row.children(":nth-child(4)").text(data.section);
  updateMetronomeData();
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
  var $row = null;
  if(data === null) {
    // generate row with filler data
    $row = $('<tr></tr>');
    $row.attr("onclick", "editSection(this)");
    $row.append( $('<td></td>').text("4/4").addClass("col-xs-3"));
    $row.append( $('<td></td>').text("100").addClass("col-xs-3"));
    $row.append( $('<td></td>').text("2").addClass("col-xs-3"));
    $row.append( $('<td></td>').text("my riff").addClass("col-xs-3"));
  } else if( data.section === "lead in" ) {
    return;
  } else {

    $row = $('<tr></tr>');
    $row.attr("onclick", "editSection(this)");
    for(var prop in data) {
      // create td with class col-xs-3
      $row.append( $('<td></td>').text(data[prop]).addClass("col-xs-3"));
    }
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
  clearTable();
  for(var sec in obj) {
    addRow(genRow(obj[sec]));
  }
}

function addRow($row) {
  // add row to tbody
  $("#metro-table tbody").append($row);
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
