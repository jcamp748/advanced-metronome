define(["qunit", "app/metronomeTable"], function(QUnit, table) {

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
      for(var i = 0; i < 4; i++) {
        data.push( $( $row.children()[i] ).text());
      }
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
      return window.song.getMeasures()[index];
    }

    // utility method for getting last index from metronomeData
    function getLastIndex() {
      return Object.keys(window.song.getMeasures()).length - 1;
    }

    // initialize test data
    window.song.editData(testObj);
    table.initialize();
    // make sure window.song.getInstance() object exists
    assert.notEqual(window.song.getMetronomeData(), undefined, "window.song.getInstance() exists");
    assert.equal( window.song.getMeasures().length, 7, "window.song starts with 7 measures");

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
    assert.equal(window.song.getMeasures().length, 7, "should start with 7 measures");
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
    var newLeadIn = {
      "timesig" : "2/4",
      "tempo" : "220",
      "count" : "1",
      "section" : "lead in"
    };
    var oldSection1 = getMeasure(1);
    table.unshift(firstSection);
    assert.deepEqual(getMeasure(1), firstSection, "unshift first section");
    assert.deepEqual(getMeasure(0), newLeadIn, "lead in should have changed tempo and timesig");
    assert.deepEqual(getMeasure(2), oldSection1, "measure 2 should be old measure 1");
    assert.equal(window.song.getMeasures().length, 8, "should be 8 measures");

    // test push
    var pushSection = {
        "timesig" : "7/4",
        "tempo" : "250",
        "count" : "1",
        "section" : "my push section"
      };
    table.push(pushSection);
    assert.deepEqual(getMeasure(getLastIndex()), pushSection, "last section should be push section");
    assert.equal(window.song.getMeasures().length, 9, "should be 9 measures");
    
    // test insert
    var insertSection = {
        "timesig" : "5/8",
        "tempo" : "123",
        "count" : "2",
        "section" : "my insert section"
      };
    var oldSection4 = getMeasure(4);
    var oldSection5 = getMeasure(5);
    var lastMeasure = getMeasure(getLastIndex());
    var leadIn = getMeasure(0);
    table.insert(insertSection, 4);
    assert.deepEqual(getMeasure(0), leadIn, "lead in should be the same");
    assert.deepEqual(getMeasure(4), oldSection4, "measure 4 should be unchanged");
    assert.deepEqual(getMeasure(5), insertSection, "section 5 should be insert section");
    assert.deepEqual(getMeasure(6), insertSection, "section 6 should be insert section");
    assert.deepEqual(getMeasure(7), oldSection5, "section 7 should be old measure 5");
    assert.equal(window.song.getMeasures().length, 11, "should be 11 measures");

    // test deleteRow
    var oldSection2 = getMeasure(2);
    newLeadIn = {
      "timesig" : "4/4",
      "tempo" : "100",
      "count" : "1",
      "section" : "lead in"
    };

    // delete 'my first section'
    $("#metronomeTable tbody").children(":nth-child(1)").click();  
    table.deleteRow();
    assert.deepEqual(getMeasure(0), newLeadIn, "lead in should different now");
    assert.deepEqual(getMeasure(1), oldSection2, "measure 2 should now be 1");
    assert.equal(window.song.getMeasures().length, 10, "should be 10 measures");
    // delete 'my insert section ( section 3 )'
    oldSection2  = song.getMetronomeData()[2];
    oldSection4 = song.getMetronomeData()[4];
    oldSection5 = song.getMetronomeData()[5];
    $("#metronomeTable tbody").children(":nth-child(3)").click();
    table.deleteRow();
    assert.deepEqual(song.getMetronomeData()[2], oldSection2, "section2 should be the same");
    assert.deepEqual(song.getMetronomeData()[3], oldSection4, "section3 should be old section4");
    assert.deepEqual(song.getMetronomeData()[4], oldSection5, "section4 should be old section5");
    assert.equal(window.song.getMeasures().length, 8, "should be 8 measures");


    // test updateRow
    $firstRow = $("#metronomeTable tbody").children(":nth-child(1)");
    $firstRow.click();
    // assert row highlighted
    assert.ok($firstRow.hasClass("highlight"), "first row should be highlighted");
    // verify data in fields
    var timesigData = $("#timeInput").val();
    var tempoData = $("#tempoInput").val();
    var countData = $("#countInput").val();
    var sectionData = $("#sectionInput").val();
    assert.equal(timesigData, $firstRow.children(":nth-child(1)").text(), "timesig data should match");
    assert.equal(tempoData, $firstRow.children(":nth-child(2)").text(), "tempo data should match");
    assert.equal(countData, $firstRow.children(":nth-child(3)").text(), "count data should match");
    assert.equal(sectionData, $firstRow.children(":nth-child(4)").text(), "section data should match");
    // change data in fields
    var myTestData = {
      "timesig" : "5/8",
      "tempo" : "333",
      "count" : "1",
      "section" : "new section"
    };
    $("#timeInput").val(myTestData.timesig);
    $("#tempoInput").val(myTestData.tempo);
    $("#countInput").val(myTestData.count);
    $("#sectionInput").val(myTestData.section);
    // click update
    $("#updateRowButton").click();
    $firstRow = $("#metronomeTable tbody").children(":nth-child(1)");
    // assert data in table
    timesigData = $("#timeInput").val();
    tempoData = $("#tempoInput").val();
    countData = $("#countInput").val();
    sectionData = $("#sectionInput").val();
    assert.equal(timesigData, $firstRow.children(":nth-child(1)").text(), "timesig data should match");
    assert.equal(tempoData, $firstRow.children(":nth-child(2)").text(), "tempo data should match");
    assert.equal(countData, $firstRow.children(":nth-child(3)").text(), "count data should match");
    assert.equal(sectionData, $firstRow.children(":nth-child(4)").text(), "section data should match");
    // assert data in metronomeData
    var measure1 = getMeasure(1);
    assert.equal(measure1.timesig, timesigData, "timesig matches in metronomeData");
    assert.equal(measure1.tempo, tempoData, "tempo matches in metronomeData");
    assert.equal(measure1.count, countData, "count matches in metronomeData");
    assert.equal(measure1.section, sectionData, "section matches in metronomeData");

  });
});
