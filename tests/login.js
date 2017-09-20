module.exports = {
  'play pause test' : function(client) {
    client
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
      .assert.containsText('#clock-display', '0.0')
      .end();
  }
};
