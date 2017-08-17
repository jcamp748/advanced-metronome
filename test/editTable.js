define(["qunit", "app/song", "app/metronomeTable"], function(QUnit, song, table) {

  QUnit.test("verify table editing functionality", function(assert) {
  
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

    window.song = song.getInstance(testObj);
    // make sure window.song object exists
    assert.notEqual(window.song, undefined, "window.song exists");


  });
});
