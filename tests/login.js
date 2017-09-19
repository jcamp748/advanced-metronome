module.exports = {
  'Login test' : function(client) {
    client
      .url('localhost:8000')
      .click('#playButton')
      .assert.containsText('main', 'News feed')
      .end();
  }
};
