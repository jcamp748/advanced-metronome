
QUnit.test( "verify control functionality", function( assert ) {

  // form should start out hidden
  assert.equal( $("#form-wrapper").is(":visible"), false, "form should start invisible");

  // clicking new button should show form
  $("#metronome-controls").children(":nth-child(3)").trigger("click");
  assert.equal( $("#form-wrapper").is(":visible"), true, "form should be visible");

  // verify reset button behavior

  // verify play button behavior
  // clicking play should change text of play button to stop
  var playButton = $("#metronome-controls").children(":nth-child(1)");
  assert.equal( playButton.text(), "play", "play button should start as play");
  playButton.trigger("click");

  // clicking stop should change the text of stop button to play
  assert.equal( playButton.text(), "stop", "play button should be stop");
  playButton.trigger("click");

});
