QUnit.test( "test include button", function( assert ) {
  assert.equal(1, 1, "one equals one");
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

  var firstSec = {
    "timesig" : "4/4",
    "tempo" : "120",
    "count" : "4",
    "section" : "my section"
  };

   var secondSec = {
    "timesig" : "4/4",
    "tempo" : "100",
    "count" : "2",
    "section" : "riff a"
  };

  var thirdSec = {
    "timesig" : "3/4",
    "tempo" : "200",
    "count" : "3",
    "section" : "riff b"
  };

  var fourthSec = {
    "timesig" : "4/4",
    "tempo" : "50",
    "count" : "2",
    "section" : "riff c"
  };

  genTable(metronomeData);
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 4, "play data should have four");

  // select all add-section buttons
  var $incButtons = $(".add-section");
  assert.equal($incButtons.length, 3, "should be three include buttons");

  // click last button
  var $thirdButton = $incButtons.children(":nth-child(3)");
  $thirdButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 3, "play data should have three");
  // get last section data
  var testSec = null;
  var lastIndex = playData.length - 1;
  testSec = metronomeData[playData[lastIndex]];
  assert.deepEqual(testSec, thirdSec, "last section should be third section");

  // click first button
  var $firstButton = $incButtons.children(":nth-child(3)");
  $firstButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 2, "play data should have two");
  // get first section
  testSec = metronomeData[playData[0]];
  assert.deepEqual(testSec, secondSec, "first section should be second section");

  // click first and last buttons
  $thirdButton.click();
  $firstButton.click();

  // click second button
  $secondButton = $incButtons.children(":nth-child(2)");
  $secondButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 3, "play data should have three");
  // verify second section
  testSec = metronomeData[playData[1]];
  assert.deepEqual(testSec, thirdSec, "second section should be third section");

});
