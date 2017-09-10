
define(["qunit", "app/song"], function(QUnit, song){
  QUnit.test( "verify clock functionality", function( assert ) {


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

    // click play
    // wait 2 seconds
    setTimeout(function() {
      console.log("done");
    }, 2000);
    // verify time
    //

  });
});
