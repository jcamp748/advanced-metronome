
QUnit.test( "verify control functionality", function( assert ) {

  // form should start out hidden
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should start invisible");

  // clicking new button should show form
  $("#metronome-controls").children(":nth-child(4)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), true, "form should be visible");
  // clicking new button again should hide form
  $("#metronome-controls").children(":nth-child(4)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should be visible");

  // clicking edit button should show form
  $("#metronome-controls").children(":nth-child(3)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), true, "form should be visible");
  // clicking edit button again should hide form
  $("#metronome-controls").children(":nth-child(3)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should be visible");
  
  // verify play() button behavior
  // clicking play should change text of play button to stop
  var playButton = $("#metronome-controls").children(":nth-child(1)");
  assert.equal( playButton.text(), "play", "play button should start as play");
  playButton.trigger("click");

  // clicking stop should change the text of stop button to play
  assert.equal( playButton.text(), "stop", "play button should be stop");
  playButton.trigger("click");

  // simulate a simple user session
  metronomeData = {};
  var testObj = {
    "-1" : {
      "timesig" : "4/4",
      "tempo" : "100",
      "count" : "1",
      "section" : "lead in"
    },
    "0" : {
      "timesig" : "4/4",
      "tempo" : "100",
      "count" : "2",
      "section" : "riff a"
    },
    "1" : {
      "timesig" : "3/4",
      "tempo" : "200",
      "count" : "3",
      "section" : "riff b"
    },
    "2" : {
      "timesig" : "4/4",
      "tempo" : "150",
      "count" : "2",
      "section" : "riff c"
    }
  };

  var testSection1 = {
    "timesig" : "4/4",
    "tempo" : "100",
    "count" : "2",
    "section" : "riff a"
  };

  var testSection2 = {
    "timesig" : "3/4",
    "tempo" : "200",
    "count" : "3",
    "section" : "riff b"
  };

  var testSection3 = {
    "timesig" : "4/4",
    "tempo" : "150",
    "count" : "2",
    "section" : "riff c"
  };
  // test addSection() button;
  $("#timeInput").val("4/4");
  $("#tempoInput").val("100");
  $("#countInput").val("2");
  $("#sectionInput").val("riff a");
  $("input[value='add section']").click();
  // verify sectionData object
  assert.deepEqual(sectionData, testSection1, "sectionData shouldn't be null");

  $("#timeInput").val("3/4");
  $("#tempoInput").val("200");
  $("#countInput").val("3");
  $("#sectionInput").val("riff b");
  $("input[value='add section']").click();
  // verify sectionData object
  assert.deepEqual(sectionData, testSection2, "sectionData shouldn't be null");

  $("#timeInput").val("4/4");
  $("#tempoInput").val("150");
  $("#countInput").val("2");
  $("#sectionInput").val("riff c");
  $("input[value='add section']").click();
  // verify sectionData object
  assert.deepEqual(sectionData, testSection3, "sectionData shouldn't be null");

  // verify reset button behavior
  // verify metronomeData object
  $("#metronome-controls").children(":nth-child(2)").click();
  assert.deepEqual(metronomeData, testObj, "metronomeData shouldn't be null");

  // test addRow
  $("#metro-table tbody").empty();
  assert.equal($("metro-table tbody").children().length, 0, "#metro-table should have 0 elements");
  var testRow = {
    "timesig" : "3/8",
    "tempo"   : "134",
    "count"   : "34",
    "section" : "cool stuff"
  };

  addRow(genRow(testRow));
  assert.equal($("#metro-table tbody").children().length, 1, "#metro-table should have 1 element");


  // test clearTable()
  clearTable();
  assert.equal($("metro-table tbody").children().length, 0, "#metro-table should have 0 elements");


  // populate table with sample data
  $("#metro-table tbody").empty();
  assert.equal(0, $("#metronome-table tbody").length, "#metro-table should have 0 elements");
  addRow(genRow(testRow));
  assert.equal($("#metro-table tbody").children().length, 1, "#metro-table should have 1 element");

  // press clear table button
  // verify table is empty
  $("#metronome-form input[value='clear table']").click();
  assert.equal($("#metro-table tbody").children().length, 0, "#metro-table should have 0 element");
  
  // set global metronomeData object
  metronomeData = testObj;
  nextSection();

  // verify timesig, beatsPerMeasure, beatUnit, tempo, measureCount, sectionName
  assert.equal(timesig, "4/4", "timesig should be 4/4");
  assert.equal(tempo, "100", "tempo should be 100");
  assert.equal(beatsPerMeasure, "4", "beatsPerMeasure should be 4");
  assert.equal(beatUnit, "4", "beatUnit should be 4");
  assert.equal(measureCount, "2", "measureCount should be 2");
  assert.equal(sectionName, "riff a", "section name should be 'riff a'");

  // test highlightRow(row)
  // with section loaded first section should be highlighted
  genTable(testObj);
  reset();
  // skip lead in
  nextSection();
  var $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  assert.equal( $firstSection.hasClass("highlight"), true, "first row should be highlighted");

  // test lead in
  metronomeData = testObj;
  $("#lead-checkbox").prop("checked", false);
  reset();
  $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  assert.equal( $firstSection.hasClass("highlight"), true, "first row should be highlighted");

  metronomeData = testObj;
  $("#lead-checkbox").prop("checked", true);
  reset();
  $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  assert.equal( $firstSection.hasClass("highlight"), false, "first row should not be highlighted");

  // click edit again just to show table
  $("#metronome-controls").children(":nth-child(3)").trigger("click");
  
});
