requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app'
  }
});

requirejs(['app/metronome'], function(metronome){
  metronome.loadData({one: "one", two: "two"});
  metronome.play();
  metronome.pause();
  metronome.seekTo(30);
});
