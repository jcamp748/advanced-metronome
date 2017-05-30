define(function() {

  // do initialization work
  
  // private data variable
  var metronomeData = {};

  // create the metronome object and add variables and methods to it
  var metronome = {};

  metronome.play = function() {
    console.log("playing");
  };

  metronome.pause = function() {
    console.log("pause");
  };

  metronome.seekTo = function(time) {
    console.log("seek to " + time);
  };

  metronome.loadData = function(data) {
    metronomeData = data;
    console.log(data);
  };


  // return the metronome object when done
  return metronome;
});
