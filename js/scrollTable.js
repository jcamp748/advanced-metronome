// called when user clicks add row before button
function addRowBefore() {
  // 0 based index
  var index = getIndex( $("tr.highlight") );
  var nrow = { timesig: "4/4", tempo: "120", count: "4", section: "my section" };
  var data = metronomeData;
  var ndata = {};
  var offset = 0;
  var length = Object.keys(data).length;
  // one of the sections is potentially a lead in section
  if( data["-1"] ) length--;
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
  updatePlayData();
  leadIn();
}

// called when user clicks add row after button
function addRowAfter() {
  var index = getIndex( $("tr.highlight") );
  var nrow = { timesig: "4/4", tempo: "120", count: "4", section: "my section" };
  var data = metronomeData;
  var ndata = {};
  var sec = null;
  var offset = 0;
  var length = Object.keys(data).length;
  // one of the sections is potentially a lead in section
  if( data["-1"] ) length--;
  for( var i = 0; i < length + 1; i++ ) {
    if( i !== index ) {
      sec = data[i + offset];
      ndata[i] = sec;
    } else {
      sec = data[i];
      ndata[i] = sec;
      i++;
      ndata[i] = nrow;
      offset = -1;
    }
  }
  metronomeData = ndata;
  genTable(metronomeData);
  updatePlayData();
  leadIn();
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
      .attr("onclick", "includeSection(this)")
      .text("remove")));
  
  return $row;
}

function includeSection(button) {
  var $button = $(button);
  $button.toggleClass('add-section');
  if( $button.text() === "remove" ) {
    $button.text("include");
  } else {
    $button.text("remove");
  }
  updatePlayData();
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
  updatePlayData();
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

// utility function to highlight a row inexed at 1
function highlightRow(row) {
  $("#metro-table tbody").children().removeClass("highlight");
  $("#metro-table tbody").children(":nth-child(" + row.toString() + ")").toggleClass("highlight");
}
