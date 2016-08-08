
QUnit.test( "verify validator functionality", function( assert ) {
  // set #timeInput, #tempoInput, #countInput, #sectionInput

  // test with valid data
  var testObj = {
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
      "tempo" : "150",
      "count" : "2",
      "section" : "riff c"
    }
  };
  metronomeData = testObj;
  genTable(metronomeData);

  var dataAfter = {
    "-1" : {
      "timesig" : "3/8",
      "tempo" : "132",
      "count" : "1",
      "section" : "lead in"
    },
    "0" : {
      "timesig" : "3/8",
      "tempo" : "132",
      "count" : "4",
      "section" : "first riff"
    },
    "1" : {
      "timesig" : "3/4",
      "tempo" : "200",
      "count" : "3",
      "section" : "riff b"
    },
    "2" : {
      "timesig" : "4/4",
      "tempo" : "150",
      "count" : "2",
      "section" : "riff c"
    }
  };

  //$('#form-wrapper').toggle();
  highlightRow(1);
  $("#timeInput").val("3/8");
  $("#tempoInput").val("132");
  $("#countInput").val("4");
  $("#sectionInput").val("first riff");
  // change data on first row
  validate();
  assert.deepEqual(metronomeData, dataAfter, "metronomeData should be updated");
  reset();

  
  // test with invalid data
});
