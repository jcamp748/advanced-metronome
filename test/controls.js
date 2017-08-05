
QUnit.test( "verify control functionality", function( assert ) {

  // form should start out hidden
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should start invisible");
  // clicking edit button should show form
  $("#editButton").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), true, "form should be visible");
  // clicking edit button again should hide form
  $("#editButton").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should be invisible");
  
  // verify play() button behavior
  // play button should be enabled to start
  // pause button should be disabled to start
  var playButton = $("#playButton");
  var pauseButton = $("#pauseButton");
  assert.equal( playButton.prop("disabled"), false, "play button should start enabled");
  assert.equal( pauseButton.prop("disabled"), true, "pause button should start disabled");

  // play should be disabled after clicking it and pause should be enabled
  playButton.trigger("click");
  assert.equal( playButton.prop("disabled"), true, "play button should be disabled after clicking play");
  assert.equal( pauseButton.prop("disabled"), false, "pause button should be enabled after clicking play");

  // play should be enabled after clicking pause and pause should be disabled
  pauseButton.trigger("click");
  assert.equal( playButton.prop("disabled"), false, "play button should be enabled after clicking pause");
  assert.equal( pauseButton.prop("disabled"), true, "pause button should be disabled after clicking pause");

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
  $("#updateRowButton").click();
  //console.log(JSON.stringify(metronomeData));
  var sectionData = metronomeData["0"];

  // verify sectionData object
  assert.deepEqual(sectionData, testSection1, "sectionData shouldn't be null");
  assert.equal(playData.length, 4, "play data should have 4");

  highlightRow(1);
  highlightRow(2);
  $("#timeInput").val("2/4");
  $("#tempoInput").val("100");
  $("#countInput").val("4");
  $("#sectionInput").val("my riff b");
  $("#updateRowButton").click();
  //console.log(JSON.stringify(metronomeData));
  // verify sectionData object
  // it happens after this
  //console.log(JSON.stringify(metronomeData));
  sectionData = metronomeData["1"];
  assert.deepEqual(sectionData, testSection2, "sectionData shouldn't be null");
  assert.equal(playData.length, 4, "play data should have 4");

  highlightRow(2);
  highlightRow(3);
  $("#timeInput").val("4/4");
  $("#tempoInput").val("110");
  $("#countInput").val("244");
  $("#sectionInput").val("my riff c");
  $("#updateRowButton").click();
  // verify sectionData object
  sectionData = metronomeData["2"];
  assert.deepEqual(sectionData, testSection3, "sectionData shouldn't be null");
  assert.equal(playData.length, 4, "play data should have 4");
  reset();


  // test highlightRow(row)
  // with section loaded first section should be highlighted
  //genTable(testObj);
  reset();
  assert.equal(playData.length, 4, "play data should have 4");
  //skip lead in
  nextSection();
  //go to first section
  nextSection();
  var $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  assert.equal( $firstSection.hasClass("highlight"), true, "first row should be highlighted");
  assert.equal(playData.length, 2, "play data should have 2");

  // test lead in
  metronomeData = testObj;
  $("#lead-checkbox").prop("checked", false);
  reset();
  $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  nextSection();
  assert.equal( $firstSection.hasClass("highlight"), true, "first row should be highlighted");
  assert.equal(playData.length, 2, "play data should have two");

  metronomeData = testObj;
  $("#lead-checkbox").prop("checked", true);
  reset();
  $firstSection = $("#metro-table tbody").children(":nth-child(1)");
  assert.equal( $firstSection.hasClass("highlight"), false, "first row should not be highlighted");
  assert.equal(playData.length, 4, "play data should have four");

  // test includeSection(this) on table
  reset();
  var $include = $("#metro-table tbody").children(":nth-child(2)").children(":nth-child(5)");
  $include.click();
  assert.equal(playData.length, 4, "should be four sections in play data");

});
