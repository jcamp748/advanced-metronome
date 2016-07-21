//QUnit.test( "a basic test example", function( assert ) {
  //var value = "hello";
  //assert.equal( value, "hello", "We expect value to be hello" );
//});

QUnit.test( "verify page markup", function( assert ) {
  var $outerWrapper = $("#metronome-wrapper");
  assert.equal( $outerWrapper.is("div"), true, "verify outer wrapper is a div");
  assert.equal( $outerWrapper.length, 1, "should be only one metronome-wrapper id");

  assert.equal( $outerWrapper.children(":nth-child(1)").is("div"), true, "verify  display-wrapper div");
  assert.equal( $("#display-wrapper").length, 1, "should be only one display-wrapper id");

  assert.equal( $outerWrapper.children(":nth-child(2)").is("div"), true, "verify  metronome-controls div");
  assert.equal( $("#metronome-controls").length, 1, "should be only one metronome-controls id");

  assert.equal( $outerWrapper.children(":nth-child(3)").is("div"), true, "verify  form-wrapper div");
  assert.equal( $("#form-wrapper").length, 1, "should be only one form-wrapper id");

  assert.equal( $("#form-wrapper").children().hasClass("row"), true, "should be only one row");
  assert.equal( $(".row").children().length, 2, "should be 2 children in the row");
  assert.equal( $(".row").children(":nth-child(1)").hasClass("col-md-4"), true, "first col should be 4");
  assert.equal( $(".row").children(":nth-child(2)").hasClass("col-md-8"), true, "first col should be 8");

  assert.equal( $("#metronome-controls button").length, 3, "should be 3 control buttons");

  assert.equal( $("#metronome-form").is("form"), true, "should be metronome-form");

  var $formInputs = $("#metronome-form .form-group");
  assert.equal( $formInputs.length, 4, "should be 4 form groups");

  $.each($formInputs, function(key, value){
    //console.log(value); 
    assert.equal( $(value).children().length, 3, "each form group should have 3 children");
  });


});
