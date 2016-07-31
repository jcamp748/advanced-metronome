
QUnit.test( "verify control functionality", function( assert ) {
  assert.equal(1,1);

  metronomeData = {};
  var testObj = {
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
      "tempo" : "120",
      "count" : "2",
      "section" : "riff c"
    }
  };

  genTable(testObj);
});
