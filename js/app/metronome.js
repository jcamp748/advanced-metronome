define(["worker!app/metronomeWorker.js", "app/observerList"], function(worker, observerList) {
  // do initialization work
  debugger
  
  // private data variable
  var metronomeData = {};

  // create the metronome object and add variables and methods to it
  var metronome = {};

  metronome.skipBack = function() {
    console.log("skip back");
  };

  metronome.rewind = function() {
    console.log("rewind");
  };

  metronome.play = function() {
    console.log("play");
    worker.postMessage("start");

  };

  metronome.pause = function() {
    console.log("pause");
    worker.postMessage("pause");
  };

  metronome.fastForward = function() {
    console.log("fast forward");
  };

  metronome.skipForward = function() {
    console.log("skip forward");
  };

  metronome.seekTo = function(time) {

  };

  metronome.loadData = function(data) {
    metronomeData = data;
    console.log(data);
  };

  metronome.reset = function(data) {
    console.log("reset metronome");
  };

  metronome.edit = function(data) {
    $("#form-wrapper").toggleClass("hidden");
  };



  metronome.draw = function() {
    // start the drawing loop to display the metronome
  };


  // return the metronome object when done
  return metronome;
});
