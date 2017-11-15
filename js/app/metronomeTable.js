// this module is the api for editing the global
// metronome data structure that the application 
// logic is based on
define(['app/song'], function(song){
  // do initialization work here
  // private utility functions for updating table
  
  // utitlity function to test equality of rows
  function rowsEqual(row1, row2) {
    for(var i = 0; i < 4; i++) {
      var value1 = $(row1.children()[i]).text();
      var value2 = $(row2.children()[i]).text();
      if( value1 != value2 ) {
        return false;
      }
    }
    return true;
  }
  
  // utility function to get the index of the current row
  function getIndex($row) {
    var $table = $("#metronomeTable tbody");
    // get the number of rows in the table, indexed at 1
    var len = $table.children().length
    for(var i = 1; i <= len; i++) {
      var selector = ":nth-child(" + i.toString() + ")";
      var row = $table.children(selector);
      if( rowsEqual($row, row)) {
        return i;
      }
    }
    return "row not found";
  }

  function deleteTable() {
    // find and delete table
    $("#metronomeTable").empty();
  }


  function generateTable() {
    // use window.metronomeData to generate table
    $("#metronomeTable").append(generateHead());
    $("#metronomeTable").append($('<tbody></tbody>'));
    var data = song.getMetronomeData();
    if(data) {
      var len = Object.keys(data).length;
      for(var i = 1; i < len; i++) {
        addRow(generateRow(data[i]));
      }
    }
    //for(var section in data) {
      //addRow(generateRow(data[section]));
    //}
  }

  function generateHead() {
    // generate <thead> element
    $head = $("<thead>");
    var headings = {
      0: "time sig",
      1: "tempo",
      2: "measures",
      3: "name",
      4: "loop"
    };
    $head.append(function(){
      var $markup = $("<tr>");
      for(var key in headings) {
        $markup.append($("<th>").attr("class", "col-xs-2").text(headings[key]));
      }
      return $markup;
    });
    return $head;
  }
    
          

  function insertTable() {
    // inject table into html view
  }

  function generateRow(section) {
    // use SECTION data to generate html <tr> element

    var $row = $('<tr>');
    for(var prop in section) {
      // create td with class col-xs-3
      $row.append( $('<td></td>').text(section[prop]).addClass("col-xs-3"));
    }
    // add checkbox to row
    var $checkBox = $('<input>').attr("type", "checkbox").change(song.updateLoop);
    $row.append( $('<td></td>').append( $checkBox ));
    $row.click(function(){
      // highlight row in table
      $("#metronomeTable tbody").children().removeClass("highlight");
      var $row = $(this);
      $row.addClass("highlight");
      // populate form with data from section
      $row.addClass("highlight");
      // just take the data from the row
      var $formGroup = $("#metronomeForm .form-group");
      for(var i = 0; i < $formGroup.length; i++) {
        var value = section[Object.keys(section)[i]];
        $($formGroup[i]).children(":nth-child(2)").val(value);
      }
    });
    return $row;
  }

  function updateData() {
    var $row = $("tr.highlight");
    var rowIndex = getIndex($row);
    var $form = $("#metronomeForm");
    var i = 0;
    var selectors = {
      0: ":nth-child(1)",
      1: ":nth-child(2)",
      2: ":nth-child(3)",
      3: ":nth-child(4)"
    };

    var oldData = song.getMetronomeData()[rowIndex];
    var newData = oldData;

    for(var key in oldData) {
      newData[key] = $form.children(selectors[i]).children(":nth-child(2)").val();
      i++;
    }
    song.getMetronomeData()[rowIndex] = newData;
    return rowIndex;
  }

  function addRow($row) {
    // add jquery obj $ROW to view
    $("#metronomeTable tbody").append($row);
  }

  function updateTable() {
      deleteTable();
      generateTable();
   }


  // return the api
  // the global object is an array of Section objects
  return {
    update: function(context) {
      //song = context;
      updateTable();
    },

    unshift: function(section) {
      // add section to metronomeData after lead in
      var len = Object.keys(song.getMetronomeData()).length;
      var oldData = Object.assign({}, song.getMetronomeData());
      var newData = {};
      newData[0] = oldData[0];
      newData[0].tempo = section.tempo;
      newData[0].timesig = section.timesig;
      newData[1] = section;
      for( var i = 2; i < len + 1; i++) {
        newData[i] = oldData[i - 1];
      }
      updateTable();
      song.editData(newData);
    },

    push: function(section) {
      // add section to end of array
      var len = Object.keys(song.getMetronomeData()).length;
      var newData = Object.assign({}, song.getMetronomeData());
      newData[len] = section;
      song.editData(newData);
    },

    insert: function(section, index) {
      // put SECTION at INDEX and move the rest of the
      // sections up 1 place
      var len = Object.keys(song.getMetronomeData()).length;
      var oldData = Object.assign({}, song.getMetronomeData());
      var newData = {};
      for(var i = 0; i < index; i++) {
        newData[i] = oldData[i];
      }
      newData[index] = section;
      for(var i = index; i < len; i++) {
        newData[i + 1] = oldData[i];
      }
      song.editData(newData);

    },

    deleteRow: function() {
      // get index of highlighted row
      var index = getIndex($("tr.highlight"));
      var oldData = Object.assign({}, song.getMetronomeData());
      // remove data from global object
      delete oldData[index];
      // change the indices of remaining keys in the object
      var keys = Object.keys(oldData);
      var numberOfKeys = keys.length;
      var newData = {};
      for(var i = 1; i < numberOfKeys; i++) {
        newData[i] = oldData[keys[i]];
      }
      song.editData(newData);
      updateTable();
    },

    create: function() {
      // initialize a section and return it
      var section = {
        "timesig" : "4/4",
        "tempo" : "100",
        "count" : "10",
        "section" : "my section"
      };
      return section;
    },

    updateRow: function() {
      // check for a highlighted row
      if($("tr.highlight").length){
        // use data from metronomeForm to update window.metronomeData object
        // :nth-child selector uses 1 based indexing so we add 1 to the rowIndex
        var rowIndex = updateData() + 1;
        // delete the html for the table
        deleteTable();
        // generate the new html for the table
        generateTable();
        // highlight updated row
        $("#metronomeTable tbody").children(":nth-child(" + rowIndex.toString() + ")").attr("class", "highlight");
        // we have to add 1 to the index because row 0 is reserved for the lead in section
        var $row = $("tr.highlight");
        var index = getIndex($row) + 1;
        var newData = Object.assign({}, song.getMetronomeData());
        newData[index].timesig = $row.children(":nth-child(1)").text();
        newData[index].tempo = $row.children(":nth-child(2)").text();
        newData[index].count = $row.children(":nth-child(3)").text();
        newData[index].section = $row.children(":nth-child(4)").text();
        song.editData(newData);
        updateTable();

      }
    },

    initialize: function() {
      deleteTable();
      generateTable();
    },

    edit: function() {
      console.log("show/hide table");
      $("#form-wrapper").toggleClass("hidden");
    },
  };

});

