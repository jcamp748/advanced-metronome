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

  // verify text of include buttons
  $incButtons.each( function(index, element) {
    var $element = $(element);
    assert.equal($element.text(), "remove", "buttons should say remove");
  });

  // click last button
  var $thirdButton = $($incButtons[2]);
  $thirdButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 3, "play data should have three");
  assert.equal($thirdButton.text(), "include", "third button should say include");
  // get last section data
  var testSec = null;
  var lastIndex = playData.length - 1;
  testSec = metronomeData[playData[lastIndex]];
  assert.deepEqual(testSec, thirdSec, "last section should be third section");

  // click first button
  var $firstButton = $($incButtons[0]);
  $firstButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 2, "play data should have two");
  assert.equal($firstButton.text(), "include", "first button should say include");
  // get first section
  testSec = metronomeData[playData[0]];
  assert.deepEqual(testSec, secondSec, "first section should be second section");

  // click first and last buttons
  $thirdButton.click();
  $firstButton.click();
  assert.equal($firstButton.text(), "remove", "first button should say remove");
  assert.equal($thirdButton.text(), "remove", "third button should say remove");

  // click second button
  $secondButton = $($incButtons[1]);
  $secondButton.click();
  assert.equal(Object.keys(metronomeData).length, 4, "metronomeData should have 4 keys");
  assert.equal(playData.length, 3, "play data should have three");
  assert.equal($secondButton.text(), "include", "second button should say include");
  // verify second section
  testSec = metronomeData[playData[1]];
  assert.deepEqual(testSec, thirdSec, "second section should be third section");

});
