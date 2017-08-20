define(["qunit", "app/song", "app/metronomeTable"], function(QUnit, song, table) {

  QUnit.test("verify table editing functionality", function(assert) {
  
    var testObj = {
      "0" : {
        "timesig" : "4/4",
        "tempo" : "100",
        "count" : "1",
        "section" : "lead in"
      },
      "1" : {
        "timesig" : "4/4",
        "tempo" : "100",
        "count" : "1",
        "section" : "intro"
      },
      "2" : {
        "timesig" : "3/4",
        "tempo" : "200",
        "count" : "2",
        "section" : "chorus"
      },
      "3" : {
        "timesig" : "4/4",
        "tempo" : "150",
        "count" : "3",
        "section" : "outro"
      }
    };

    function getInputData(index) {
      // get the data for the row at INDEX and return it
      
      //:nth-child is indexed at 1 so we need to inc the index
      index++;
      var selector = ":nth-child(" + index.toString() + ")";
      var $row = $("#metronomeForm").children(selector);
      return $row.children("input").val();
    }

    function getRowData() {
      // get data from first 4 columns of the highlighted row
      // and return it as an array of strings
      var data = [];

      var $row = $("#metronomeTable tbody").children(".highlight");
      $row.children().each(function() {
        // this is the current DOM element in the loop
        data.push($(this).text());
      });
      return data;
    }

    function verifyForm() {
      // verify the fields in the form match the highlighted row data
      var match = true;
      var rowData = getRowData();
      for(var i = 0, len = rowData.length; i < len; i++) {
        if(rowData[i] != getInputData(i)) {
          match = false;
        }
      }
      return match;
    }

    // utility method for getting a measure from metronomeData
    function getMeasure(index) {
      return window.song.metronomeData[index];
    }

    // utility method for getting last index from metronomeData
    function getLastIndex() {
      return Object.keys(window.song.metronomeData).length;
    }

    // initialize test data
    window.song = song.getInstance(testObj);
    table.initialize();
    // make sure window.song object exists
    assert.notEqual(window.song, undefined, "window.song exists");
    assert.equal( window.song.measures.length, 7, "song starts with 7 measures");

    // test row click event
    var $firstRow = $("#metronomeTable tbody").children(":nth-child(1)");
    var $secondRow = $("#metronomeTable tbody").children(":nth-child(2)");
    $firstRow.click();
    assert.ok($firstRow.hasClass("highlight"), "the first row is highlighted");
    assert.ok(verifyForm(), "form data matches row data");
    $secondRow.click();
    assert.notOk($firstRow.hasClass("highlight"), "the first row is NOT highlighted");
    assert.ok($secondRow.hasClass("highlight"), "the second row is highlighted");
    assert.ok(verifyForm(), "form data matches row data");

    // test adding and removing sections
    //
    // test create
    var mySection = {
        "timesig" : "4/4",
        "tempo" : "100",
        "count" : "10",
        "section" : "my section"
      };
    var createdSection = table.create();
    assert.deepEqual(createdSection, mySection, "should have created new dummy section");

    // test unshift
    var firstSection = {
        "timesig" : "2/4",
        "tempo" : "220",
        "count" : "1",
        "section" : "my first section"
      };
    table.unshift(firstSection);
    assert.deepEqual(getMeasure(1), firstSection, "unshift first section");
    assert.deepEqual(getMeasure(0), leadIn, "lead in should be the same");

    // test push
    var leadIn = getMeasure(0);
    var pushSection = {
        "timesig" : "7/4",
        "tempo" : "250",
        "count" : "1",
        "section" : "my push section"
      };
    table.push(pushSection);
    assert.deepEqual(getMeasure(getLastIndex()), pushSection, "last section should be push section");
    assert.deepEqual(getMeasure(0), leadIn, "lead in should be the same");
    
    // test insert
    var insertSection = {
        "timesig" : "5/8",
        "tempo" : "123",
        "count" : "1",
        "section" : "my first section"
      };
    var oldMeasure6 = getMeasure(6);
    var oldMeasure7 = getMeasure(7);
    var lastMeasure = getMeasure(getLastIndex());
    table.insert(insertSection, 7);
    assert.deepEqual(getMeasure(0), leadIn, "lead in should be the same");
    assert.deepEqual(getMeasure(7), insertSection, "insertSection should be at index 7");
    assert.deepEqual(getMeasure(8), oldMeasure7, "section seven should now be 8"); 
    assert.deepEqual(getMeasure(6), oldMeasure6, "section six should be the same as it was");
    assert.deepEqual(getMeasure(getLastIndex()), lastMeasure, "last measure should be the same");

    // test deleteRow
    var oldMeasure2 = getMeasure(2);
    lastMeasure = getMeasure(getLastIndex());
    // delete 'my first section'
    $("#metronomeTable tbody").children(":nth-child(2)").click();  
    table.deleteRow();
    assert.deepEqual(getMeasure(0), leadIn, "lead in should be the same");
    assert.deepEqual(getMeasure(1), oldMeasure2, "measure 2 should now be 1");
    assert.deepEqual(getMeasure(getLastIndex()), lastMeasure, "last measure should still be the same");

    // test updateRow
    



  });
});
