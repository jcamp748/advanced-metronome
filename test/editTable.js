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

    function verifyForm() {
      // verify the fields in the form match the highlighted row data

    }

    window.song = song.getInstance(testObj);
    // make sure window.song object exists
    assert.notEqual(window.song, undefined, "window.song exists");
    assert.equal( window.song.measures.length, 7, "song starts with 7 measures");

    // test row click event
    var $firstRow = $("#metronomeTable tbody").children(":nth-child(1)");
    var $secondRow = $("#metronomeTable tbody").children(":nth-child(2)");
    $firstRow.click();
    assert.ok($firstRow.hasClass("highlight"), "the first row is highlighted");
    $secondRow.click();
    assert.notOk($firstRow.hasClass("highlight"), "the first row is NOT highlighted");
    assert.ok($secondRow.hasClass("highlight"), "the second row is highlighted");



  });
});
