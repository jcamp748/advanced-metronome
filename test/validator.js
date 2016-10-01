
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

  var dataAfterWithLead = {
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

  var dataAfterNoLead = {
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

  highlightRow(1);
  $("#timeInput").val("3/8");
  $("#tempoInput").val("132");
  $("#countInput").val("4");
  $("#sectionInput").val("first riff");
  // change data on first row
  assert.equal(validate(), true, "data should validate");
  assert.deepEqual(metronomeData, dataAfterNoLead, "metronomeData should be updated");
  reset();

  $("#lead-checkbox").prop("checked", true);
  highlightRow(1);
  $("#timeInput").val("3/8");
  $("#tempoInput").val("132");
  $("#countInput").val("4");
  $("#sectionInput").val("first riff");
  // change data on first row
  assert.equal(validate(), true, "data should validate");
  assert.deepEqual(metronomeData, dataAfterWithLead, "metronomeData should be updated");
  reset();

  // test with invalid data
  highlightRow(1);
  $("#timeInput").val("3/8");
  $("#tempoInput").val("132");
  $("#countInput").val("4");
  $("#sectionInput").val("invalid section");

  // verify time sig is of the form N/M where 
  // 1 <= N <= 9 and M == 2 || 4 || 8
  $("#timeInput").val("3/8a");
  assert.equal(validate(), false, "3/8a should be invalid");

  $("#timeInput").val("3/8");
  assert.equal(validate(), true, "3/8 should be valid");

  $("#timeInput").val("af3/8");
  assert.equal(validate(), false, "af3/8 should be invalid");

  $("#timeInput").val("4/4");
  assert.equal(validate(), true, "4/4 should be valid");

  // verify 1 <= tempo <= 400
  $("#tempoInput").val("132");
  assert.equal(validate(), true, "132 should be valid");

  $("#tempoInput").val("132ad");
  assert.equal(validate(), false, "132ad should be invalid");
  
  $("#tempoInput").val("1");
  assert.equal(validate(), true, "1 should be valid");

  $("#tempoInput").val("ff132");
  assert.equal(validate(), false, "ff132 should be invalid");

  $("#tempoInput").val("400");
  assert.equal(validate(), true, "400 should be valid");

  $("#tempoInput").val("0");
  assert.equal(validate(), false, "0 should be invalid");

  $("#tempoInput").val("132");
  assert.equal(validate(), true, "132 should be valid");

  $("#tempoInput").val("401");
  assert.equal(validate(), false, "401 should be invalid");

  $("#tempoInput").val("-3");
  assert.equal(validate(), false, "-3 should be invalid");

  // verify 1 <= count <= 9999
  $("#countInput").val("4");
  assert.equal(validate(), true, "4 should be valid");

  $("#countInput").val("d");
  assert.equal(validate(), false, "d should be invalid");

  $("#countInput").val("1");
  assert.equal(validate(), true, "1 should be valid");

  $("#countInput").val("0");
  assert.equal(validate(), false, "0 should be invalid");

  $("#countInput").val("9999");
  assert.equal(validate(), true, "9999 should be valid");

  $("#countInput").val("10000");
  assert.equal(validate(), false, "10000 should be invalid");

  $("#countInput").val("3000");
  assert.equal(validate(), true, "3000 should be valid");

  $("#countInput").val("4dsf");
  assert.equal(validate(), false, "4dsf should be invalid");

  $("#countInput").val("sdf4");
  assert.equal(validate(), false, "sdf4 should be invalid");

  $("#countInput").val("-4");
  assert.equal(validate(), false, "-4 should be invalid");

  // verify 1 <= section.char_length <= 18
  $("#sectionInput").val("one two");
  assert.equal(validate(), true, "section name should be valid");

  $("#sectionInput").val("");
  assert.equal(validate(), false, "section name should be invalid");

  $("#sectionInput").val("one two");
  assert.equal(validate(), true, "section name should be valid");

  $("#sectionInput").val("eighteen nineteen twenty");
  assert.equal(validate(), false, "section name should be invalid");
});
