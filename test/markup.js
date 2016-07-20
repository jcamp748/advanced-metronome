//QUnit.test( "a basic test example", function( assert ) {
  //var value = "hello";
  //assert.equal( value, "hello", "We expect value to be hello" );
//});

QUnit.test( "verify page markup", function( assert ) {
  var $outerWrapper = $("#metronome-wrapper");
  assert.equal( true, $outerWrapper.is("div"), "verify outer wrapper is a div");
  assert.equal( 1, $outerWrapper.length, "should be only one metronome-wrapper id");

  assert.equal( true, $outerWrapper.children(":nth-child(1)").is("div"), "verify  display-wrapper div");
  assert.equal( 1, $("#display-wrapper").length, "should be only one display-wrapper id");

  assert.equal( true, $outerWrapper.children(":nth-child(2)").is("div"), "verify  metronome-controls div");
  assert.equal( 1, $("#metronome-controls").length, "should be only one metronome-controls id");

  assert.equal( true, $outerWrapper.children(":nth-child(3)").is("div"), "verify  form-wrapper div");
  assert.equal( 1, $("#form-wrapper ").length, "should be only one form-wrapper id");
});
