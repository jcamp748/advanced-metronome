define(["qunit", "app/song"], function(QUnit, song){
  QUnit.test( "verify clock accuracy", function( assert ) {
    assert.equal(1, 1, "one equals one");
    $("#playButton").click();
    setTimeout(function(){
      $("#pauseButton").click();
    }, 1000);
    assert.timeout(2000);
    assert.equal(song.getTime(), 1000, "should be at 1000ms");
  });
});
