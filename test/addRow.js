QUnit.test( "test add row", function( assert ) {
  
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
      "tempo" : "50",
      "count" : "2",
      "section" : "riff c"
    }
  };

  genTable(metronomeData);

  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");

  var firstSection = {
    "timesig" : "4/4",
    "tempo" : "100",
    "count" : "2",
    "section" : "riff a"
  };

  assert.deepEqual(metronomeData["0"], firstSection, "first section should equal firstSection");

  highlightRow(1);
  $("#addRowBeforeButton").click();

  var first = {
    "timesig" : "4/4",
    "tempo" : "120",
    "count" : "4",
    "section" : "my section"
  };

   var second = {
    "timesig" : "4/4",
    "tempo" : "100",
    "count" : "2",
    "section" : "riff a"
  };

  var third = {
    "timesig" : "3/4",
    "tempo" : "200",
    "count" : "3",
    "section" : "riff b"
  };

  var fourth = {
    "timesig" : "4/4",
    "tempo" : "50",
    "count" : "2",
    "section" : "riff c"
  };

  assert.deepEqual(metronomeData["0"], first, "first section should equal first");
  assert.deepEqual(metronomeData["1"], second, "second section should equal second");
  assert.deepEqual(metronomeData["2"], third, "third section should equal third");
  assert.deepEqual(metronomeData["3"], fourth, "fourth section should equal fourth");

  highlightRow(1);
  $("#addRowBeforeButton").click();

  first = {
    "timesig" : "4/4",
    "tempo" : "120",
    "count" : "4",
    "section" : "my section"
  };

  second = {
    "timesig" : "4/4",
    "tempo" : "120",
    "count" : "4",
    "section" : "my section"
  };

  third = {
    "timesig" : "4/4",
    "tempo" : "100",
    "count" : "2",
    "section" : "riff a"
  };

  fourth = {
    "timesig" : "3/4",
    "tempo" : "200",
    "count" : "3",
    "section" : "riff b"
  };

  fifth = {
    "timesig" : "4/4",
    "tempo" : "50",
    "count" : "2",
    "section" : "riff c"
  };

  assert.deepEqual(metronomeData["0"], first, "first section should equal first");
  assert.deepEqual(metronomeData["1"], second, "first section should equal second");
  assert.deepEqual(metronomeData["2"], third, "first section should equal third");
  assert.deepEqual(metronomeData["3"], fourth, "first section should equal fourth");
  assert.deepEqual(metronomeData["4"], fifth, "first section should equal fifth");

});

