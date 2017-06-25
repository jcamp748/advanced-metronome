// this module is the api for editing the global
// metronome data structure that the application 
// logic is based on
define(function(){
  // do initialization work here

  // private utility functions for updating table
  
  
  // utility function to get the index of the current row
  function getIndex($row) {
    var $table = $("#metronomeTable tbody");
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

  function deleteTable() {
    // find and delete table
    $("#metronomeTable").empty();
  }


  function generateTable() {
    // use window.metronomeData to generate table
    $("#metronomeTable").append(generateHead());
    $("#metronomeTable").append($('<tbody></tbody>'));
    for(var section in window.metronomeData) {
      addRow(generateRow(window.metronomeData[section]));
    }
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
    $row.click(function(){
      // highlight row in table
      $("#metronomeTable tbody").children().removeClass("highlight");
      var $row = $(this);
      $row.addClass("highlight");
      // populate form with data from section
      $row.addClass("highlight");
      $("#metronomeForm .form-group").each(function(index, el){
        var section = window.metronomeData[getIndex($row)];
        var value = section[Object.keys(section)[index]];
        $(this).children(":nth-child(2)").val(value);


      });
      
    });
    return $row;
  }

  function addRow($row) {
    // add jquery obj $ROW to view
    $("#metronomeTable tbody").append($row);
  }

  // return the api
  // the global object is an array of Section objects
  return {

    unshift: function(section) {
      // add section to front of data array
    },

    push: function(section) {
      // add section to end of array
    },

    insert: function(section, index) {
      // put SECTION at INDEX and move the rest of the
      // sections up 1 place
    },

    remove: function(index) {
      // delete section at INDEX
    },

    create: function() {
      // initialize a section and return it
    },

    update: function() {
      // delete the html for the table
      deleteTable();
      // generate the new html for the table
      generateTable();
      // inject html into view
    },
  };

});




      



