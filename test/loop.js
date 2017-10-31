define(["qunit"], function(QUnit){
  QUnit.test( "test looping functionality", function( assert ) {
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

    window.song.editData(testObj);
    // make sure song.getInstance() object exists
    assert.notEqual(window.song.getMetronomeData(), undefined, "song.metronomeData exists");

    function getCheckbox(row) {
      var $td = $( $(row).children()[4] );
      return $( $td.children()[0] );
    }

    function check(rows, index) {
      var $box = getCheckbox(rows[index]);
      $box.attr("checked", "true");
      $(rows[index])addClass("highlight");
    }

    function uncheck(rows, index) {
      var $box = getCheckbox(rows[index]);
      $box.attr("checked", "false");
      $(rows[index]).removeClass("highlight");
    }

    var $rows = $("#metronomeTable tbody").children();

    assert.deepEqual(window.song.getMeasureData(), testObj["1"], "song should start on intro");

    // checking the first box should cause the song to loop on the 'intro' section
    check($rows, 0);
    window.song.skipForward();
    assert.deepEqual(window.song.getMeasureData(), testObj["1"], "song should still be on intro");

    // checking the last box should cause the song to start on outro
    uncheck($rows, 0);
    check($rows, 3);
    assert.deepEqual(window.song.getMeasureData(), testObj["3"], "song should be on outro");

    // skipping forward should cause the song to loop on the last measure
    window.song.skipForward();
    assert.deepEqual(window.song.getMeasureData(), testObj["3"], "song should still be on outro");

    // checking the first 2 $rows should cause the song to loop over the first two sections
    uncheck($rows, 3);
    check($rows, 0);
    check($rows, 1);
    assert.deepEqual(window.song.getMeasureData(), testObj["1"], "song should start on intro");
    window.song.skipForward();
    assert.deepEqual(window.song.getMeasureData(), testObj["2"], "song should be on chorus now");
    window.song.skipForward();
    assert.deepEqual(window.song.getMeasureData(), testObj["2"], "song should still be on chorus now");
    window.song.skipForward();
    assert.deepEqual(window.song.getMeasureData(), testObj["1"], "song should be on intro now");


  });
});
