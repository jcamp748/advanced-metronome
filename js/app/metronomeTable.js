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
    for(var section in window.song.metronomeData) {
      addRow(generateRow(window.song.metronomeData[section]));
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
        var section = window.song.metronomeData[getIndex($row)];
        var value = section[Object.keys(section)[index]];
        $(this).children(":nth-child(2)").val(value);


      });
      
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

    var oldData = window.song.metronomeData[rowIndex];
    var newData = oldData;

    for(var key in oldData) {
      newData[key] = $form.children(selectors[i]).children(":nth-child(2)").val();
      i++;
    }
    window.song.metronomeData[rowIndex] = newData;
    return rowIndex;
  }

  function addRow($row) {
    // add jquery obj $ROW to view
    $("#metronomeTable tbody").append($row);
  }

  function update() {
      deleteTable();
      generateTable();
   }

  // return the api
  // the global object is an array of Section objects
  return {

    unshift: function(section) {
      // add section to metronomeData after lead in
      var len = Object.keys(window.song.metronomeData).length;
      var oldData = Object.assign({}, window.song.metronomeData);
      var secondSection = window.song.metronomeData[1];
      window.song.metronomeData[1] = section;
      for( var i = 2; i < len + 1; i++) {
        window.song.metronomeData[i] = oldData[i - 1];
      }
      update();
      window.song.updateMeasures();
      window.song.measures[0].tempo = section.tempo;
      window.song.measures[0].timesig = section.timesig;
    },

    push: function(section) {
      // add section to end of array
      var index = Object.keys(window.song.metronomeData).length;
      window.song.metronomeData[index] = section;
      window.song.updateMeasures();
    },

    insert: function(section, index) {
      // put SECTION at INDEX and move the rest of the
      // sections up 1 place
      var len = Object.keys(window.song.metronomeData).length;
      var oldData = Object.assign({}, window.song.metronomeData);
      window.song.metronomeData[index] = section;
      for(var i = index; i < len; i++) {
        window.song.metronomeData[i + 1] = oldData[i];
      }
      window.song.updateMeasures();

    },

    deleteRow: function() {
      // get index of highlighted row
      var index = getIndex($("tr.highlight"));
      // remove data from global object
      delete window.song.metronomeData[index];
      // change the indices of remaining keys in the object
      var numberOfKeys = Object.keys(window.song.metronomeData).length;
      var data = {};
      var i = 0;
      for(var key in window.song.metronomeData) {
        data[i] = window.song.metronomeData[key];
        i++;
      }
      window.song.metronomeData = data;
      update();
      window.song.updateMeasures();
      window.song.measures[0].tempo = window.song.measures[1].tempo;
      window.song.measures[0].timesig = window.song.measures[1].timesig;
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
        window.song.metronomeData[1].timesig = $row.children(":nth-child(1)").text();
        window.song.metronomeData[1].tempo = $row.children(":nth-child(2)").text();
        window.song.metronomeData[1].count = $row.children(":nth-child(3)").text();
        window.song.metronomeData[1].section = $row.children(":nth-child(4)").text();
        window.song.updateMeasures();

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

