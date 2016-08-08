
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

  metronomeData = testObj;
  var testSection1 = {
    "timesig" : "4/4",
    "tempo" : "120",
    "count" : "23",
    "section" : "my riff a"
  };

  var testSection2 = {
    "timesig" : "2/4",
    "tempo" : "100",
    "count" : "4",
    "section" : "my riff b"
  };

  var testSection3 = {
    "timesig" : "4/4",
    "tempo" : "110",
    "count" : "244",
    "section" : "my riff c"
  };
  // test update() button;
  $('#form-wrapper').toggle();
  highlightRow(1);
  $("#timeInput").val("4/4");
  $("#tempoInput").val("120");
  $("#countInput").val("23");
  $("#sectionInput").val("my riff a");
  $("input[value='update']").click();
  //console.log(JSON.stringify(metronomeData));
  var sectionData = metronomeData["0"];

  // verify sectionData object
  assert.deepEqual(sectionData, testSection1, "sectionData shouldn't be null");

  highlightRow(1);
  highlightRow(2);
  $("#timeInput").val("2/4");
  $("#tempoInput").val("100");
  $("#countInput").val("4");
  $("#sectionInput").val("my riff b");
  $("input[value='update']").click();
  //console.log(JSON.stringify(metronomeData));
  // verify sectionData object
  // it happens after this
  //console.log(JSON.stringify(metronomeData));
  sectionData = metronomeData["1"];
  assert.deepEqual(sectionData, testSection2, "sectionData shouldn't be null");

  highlightRow(2);
  highlightRow(3);
  $("#timeInput").val("4/4");
  $("#tempoInput").val("110");
  $("#countInput").val("244");
  $("#sectionInput").val("my riff c");
  $("input[value='update']").click();
  // verify sectionData object
  sectionData = metronomeData["2"];
  assert.deepEqual(sectionData, testSection3, "sectionData shouldn't be null");
  reset();


  // test highlightRow(row)
  // with section loaded first section should be highlighted
  //genTable(testObj);
  reset();
  nextSection();
  // skip lead in
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

});
