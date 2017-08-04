define(["worker!app/metronomeWorker.js"], function(worker) {

  var time = 0.0;
  var measure = 0;
  var observers = null;
  var measures = [];
  var metronomeData = {};
  var currentMeasure = {};
  var currentBeat = 0;

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

  function loadMeasure(measureNumber) {
    currentMeasure = metronomeData[measureNumber];
    measure = measureNumber;
  }


  worker.onmessage = function(e){
    console.log("hello from song.js");
    this.notify();
  };

  metronomeData = loadData();
  populateMeasures();
  loadMeasure(0);

  return {
    metronomeData: metronomeData,
    getBeat: function() { return currentBeat; },
    getTempo: function() { return currentMeasure["tempo"]; },
    getCount: function() { return currentMeasure["count"]; },
    getTimeSig: function() { return currentMeasure["timeSig"]; },
    getSectionName: function() { return currentMeasure["section"]; },

    save: function() {
      // write xhr request code here
      console.log("saved to server");
      this.notify(this);
    },

    skipBack: function() {
      console.log("go back 1 measure");
      this.notify(this);
    },

    rewind: function() {
      console.log("rewind metronome");
      this.notify(this);
    },

    play: function() {
      console.log("play song");
      worker.postMessage("start");
      this.notify(this);
    },

    pause: function() {
      console.log("pause song");
      worker.postMessage("pause");
      this.notify(this);
    },

    fastForward: function() {
      console.log("fast forward");
      this.notify(this);
    },

    skipForward: function() {
      console.log("skip to next measure");
      this.notify(this);
    },

    reset: function() {
      console.log("reset to beginning of song");
      this.notify(this);
    },

    seekTo: function() {
      console.log("seek in song");
      this.notify(this);
    },

    increaseTempo: function() {
      tempo++;
      this.notify(this);
    },

    decreaseTempo: function() {
      tempo--;
      this.notify(this);
    },
  };
});
