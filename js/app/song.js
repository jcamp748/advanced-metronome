define(["worker!app/metronomeWorker.js"], function(worker) {

  var time = 0.0;
  var measure = 0;
  var observers = null;
  var measures = [];
  var metronomeData = {};

  function loadData() {
    var success = false;
    console.log("xhr request for data");
    if(!success) {
      // request failed, fill with dummy data
      return {
        "0" : {
          "timesig" : "4/4",
          "tempo" : "100",
          "count" : "1",
          "section" : "lead in"
        },
        "1" : {
          "timesig" : "4/4",
          "tempo" : "100",
          "count" : "2",
          "section" : "riff a"
        },
        "2" : {
          "timesig" : "3/4",
          "tempo" : "200",
          "count" : "3",
          "section" : "riff b"
        },
        "3" : {
          "timesig" : "4/4",
          "tempo" : "150",
          "count" : "2",
          "section" : "riff c"
        }
      };
    }
  }

  function populateMeasures() {
    for(var section in metronomeData) {
      console.log(section);
      var count = parseInt(metronomeData[section]["count"]);
      for(var i = 0; i < count; i++) {
        measures.push(metronomeData[section]);
      }
    }
  }

  worker.onmessage = function(e){
    console.log("hello from song.js");
    notify();
  };

  metronomeData = loadData();
  populateMeasures();

  return {
    metronomeData: metronomeData,
    currentBeat: 0,

    save: function() {
      // write xhr request code here
      console.log("saved to server");
      notify();
    },

    skipBack: function() {
      console.log("go back 1 measure");
      notify();
    },

    rewind: function() {
      console.log("rewind metronome");
      notify();
    },

    play: function() {
      console.log("play song");
      worker.postMessage("start");
      notify();
    },

    pause: function() {
      console.log("pause song");
      worker.postMessage("pause");
      notify();
    },

    fastForward: function() {
      console.log("fast forward");
      notify();
    },

    skipForward: function() {
      console.log("skip to next measure");
      notify();
    },

    reset: function() {
      console.log("reset to beginning of song");
      notify();
    },

    seekTo: function() {
      console.log("seek in song");
      notify();
    },
  };
});
