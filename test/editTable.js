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
        "count" : "3",
        "section" : "my first section"
      };
    table.unshift(firstSection);
    // test push
    // test insert
    // test deleteRow
    // test updateRow
    



  });
});
