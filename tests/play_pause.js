// use window.song.editData() to set the data
// then assert the window.song.getMeasureData() is correct
// test the beat count etc
//
const util = require('util')

module.exports = {
  'play pause test' : function(client) {

    // initialize data
    var testData = {
      "0" : {
        "timesig" : "4/4",
        "tempo" : "140",
        "count" : "1",
        "section" : "lead in"
      },
      "1" : {
        "timesig" : "4/4",
        "tempo" : "140",
        "count" : "1",
        "section" : "intro"
      },
      "2" : {
        "timesig" : "5/8",
        "tempo" : "200",
        "count" : "2",
        "section" : "chorus"
      },
      "3" : {
        "timesig" : "2/2",
        "tempo" : "150",
        "count" : "3",
        "section" : "outro"
      }
    }

    client.execute(function(data) {
      window.song.editData(data);
      return window.song.getMetronomeData();
    }, testData);


    // perform test
    client
      .execute(function(){
        alert(window.song.getMeasureData());
      }, [])
      .url('localhost:8000')
      .click('#playButton')
      .pause(3000)
      .click("#pauseButton")
      .assert.containsText('#clock-display', '3.0')
      .pause(1000)
      .click("#playButton")
      .pause(3000)
      .click("#pauseButton")
      .assert.containsText('#clock-display', '6.0')
      .click("#resetButton")
      //.assert.containsText('#clock-display', '0.0')
      .pause(22229292929293939399393939393939)
      .end();
  }
};
