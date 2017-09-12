define(["qunit", "app/song"], function(QUnit, song){
  QUnit.test( "verify control functionality", function( assert ) {
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

    song.editData(testObj);
    // make sure song.getInstance() object exists
    assert.notEqual(song.getMetronomeData(), undefined, "song.metronomeData exists");

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

    var skipBackButton = $("#skipBackButton");
    var skipForwardButton = $("#skipForwardButton");

    // test the skipForward and skipBack buttons
    // these buttons should move forward and backward 1 measure respectively
    // simulate clicks on skip forward and back buttons and verify data
    assert.equal(song.getSectionName(), "lead in", "song should start with lead in section");
    assert.equal(song.getMeasureNumber(), 0, "should start on measure 0");
    assert.deepEqual(song.getMeasureData(), testObj[0], "should be lead in data");

    skipBackButton.trigger("click");
    assert.equal(song.getSectionName(), "lead in", "song should still be on lead in section");
    assert.equal(song.getMeasureNumber(), 0, "should still be on measure 0");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 1, "should be on measure 1 now");
    assert.deepEqual(song.getMeasureData(), testObj[1], "should be intro data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 2, "should be on measure 2 now");
    assert.deepEqual(song.getMeasureData(), testObj[2], "should be chorus data");

    skipBackButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 1, "should be on measure 1 now");
    assert.deepEqual(song.getMeasureData(), testObj[1], "should be intro data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 2, "should be on measure 2 now");
    assert.deepEqual(song.getMeasureData(), testObj[2], "should be chorus data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 3, "should be on measure 3 now");
    assert.deepEqual(song.getMeasureData(), testObj[2], "should be chorus data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 4, "should be on measure 4 now");
    assert.deepEqual(song.getMeasureData(), testObj[3], "should be outro data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 5, "should be on measure 5");
    assert.deepEqual(song.getMeasureData(), testObj[3], "should be outro data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 6, "should be on measure 6");
    assert.deepEqual(song.getMeasureData(), testObj[3], "should be outro data");

    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 6, "should still be be on measure 6");
    assert.deepEqual(song.getMeasureData(), testObj[3], "should still be outro data");

    // test reset button
    // the reset button should take us back to the first measure regardless of where we are
    var resetButton = $("#resetButton");
    resetButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 0, "should be on measure 0");
    assert.deepEqual(song.getMeasureData(), testObj[0], "should be on lead in data");
    skipForwardButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 1, "should be on measure 1 now");
    assert.deepEqual(song.getMeasureData(), testObj[1], "should be intro data");
    resetButton.trigger("click");
    assert.equal(song.getMeasureNumber(), 0, "should be on measure 0");
    assert.deepEqual(song.getMeasureData(), testObj[0], "should be on lead in data");


    
  });
});
