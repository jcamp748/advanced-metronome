QUnit.test( "test delete row", function( assert ) {
  metronomeData = {
    "-1" : {
      "timesig" : "4/4",
      "tempo" : "100",
      "count" : "1",
      "section" : "lead in"
    },
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
    },
    "2" : {
      "timesig" : "4/4",
      "tempo" : "250",
      "count" : "2",
      "section" : "riff c"
    }
  };
  genTable(metronomeData);
  assert.equal(Object.keys(metronomeData).length, 4, "should start with 4 sections");
  highlightRow(1);
  deleteRow();
  assert.equal(Object.keys(metronomeData).length, 3, "should be 3 sections now");
});
