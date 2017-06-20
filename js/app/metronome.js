define(["worker!app/metronomeWorker.js"], function(worker) {
  // do initialization work
  
  // private data variable
  var metronomeData = {};

  // create the metronome object and add variables and methods to it
  var metronome = {};

  metronome.play = function() {
    console.log("play");
    //worker.postMessage("start");

  };

  metronome.pause = function() {
    
  };

  metronome.seekTo = function(time) {

  };

  metronome.loadData = function(data) {
    metronomeData = data;
    console.log(data);
  };

  metronome.draw = function() {
    // start the drawing loop to display the metronome
  };


  // return the metronome object when done
  return metronome;
});
