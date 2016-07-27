
QUnit.test( "verify control functionality", function( assert ) {

  // form should start out hidden
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should start invisible");

  // clicking new button should show form
  $("#metronome-controls").children(":nth-child(3)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), true, "form should be visible");


  // verify play button behavior
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

  $("#timeInput").val("4/4");
  $("#tempoInput").val("100");
  $("#countInput").val("2");
  $("#sectionInput").val("riff a");
  $("input[value='add section']").click();
  // verify sectionData object
  assert.deepEqual(sectionData, testSection1);

  $("#timeInput").val("3/4");
  $("#tempoInput").val("200");
  $("#countInput").val("3");
  $("#sectionInput").val("riff b");
  $("input[value='add section']").click();
  // verify sectionData object
  assert.deepEqual(sectionData, testSection2);

  // verify reset button behavior
  // verify metronomeData object
  $("#metronome-controls").children(":nth-child(2)").click();
  assert.deepEqual(metronomeData, testObj);

  // test clearTable()
  // test highlightRow(row)
});
