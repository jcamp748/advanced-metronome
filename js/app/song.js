define(["app/subject","worker!app/metronomeWorker.js"], function(subject, worker) {

  var time = 0.0;
  var measure = 0;

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

  return {

    create: function() {
      var song = subject.create();
      song.metronomeData = {};
      
      // load data from server
      song.metronomeData = loadData();
      return song;
    },

    save: function() {
      // write xhr request code here
      console.log("saved to server");
    },

    skipBack: function() {
      console.log("go back 1 measure");
    },

    rewind: function() {
      console.log("rewind metronome");
    },

    play: function() {
      console.log("play song");
      //worker.postMessage("start");
    },

    pause: function() {
      console.log("pause song");
      //worker.postMessage("pause");
    },

    fastForward: function() {
      console.log("fast forward");
    },

    skipForward: function() {
      console.log("skip to next measure");
    },

    reset: function() {
      console.log("reset to beginning of song");
    },

    seekTo: function() {
      console.log("seek in song");
    },
  };
});
