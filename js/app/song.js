define(["worker!app/metronomeWorker.js"], function(worker) {

  var instance = null;

  function loadData(data) {
    if(data) {
      this.metronomeData = data;
    }
    var success = false;
    console.log("xhr request for data");
    if(!success) {
      // request failed, fill with dummy data
      // this === window, this needs to be fixed
      this.metronomeData = {
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
    measures = [];
    for(var section in this.metronomeData) {
      var count = parseInt(this.metronomeData[section]["count"]);
      for(var i = 0; i < count; i++) {
        measures.push(this.metronomeData[section]);
      }
    }
  }

  function loadMeasure(measureNumber) {
    currentMeasure = this.metronomeData[measureNumber];
    measure = measureNumber;
  }

  worker.onmessage = function(e){
    console.log("hello from song.js");
    this.notify();
  };

  function init(data) {
    data = data || null;
    // private variables
    var time = 0.0;
    var measure = 0;
    var observers = null;
    var measures = [];
    var metronomeData = data;
    var currentMeasure = {};
    var currentBeat = 0;

    // private methods
    
    // return public methods and variables
    return {
      getBeat: function() { return currentBeat; },
      getTempo: function() { return currentMeasure["tempo"]; },
      getCount: function() { return currentMeasure["count"]; },
      getTimeSig: function() { return currentMeasure["timeSig"]; },
      getSectionName: function() { return currentMeasure["section"]; },
      getMeasureNumber: function() { return measures.indexOf(currentMeasure);},
      getMeasureData: function() {return currentMeasure;},
      
      // utitlity method for testing song object
      loadTestData: function(data) {
        loadData(data);
        populateMeasures();
        loadMeasure(0);
      },

      save: function() {
        // write xhr request code here
        console.log("saved to server");
        this.notify(this);
      },

      skipBack: function() {
        var i = measures.indexOf(currentMeasure);
        if(i > 0) {
          loadMeasure(--i);
        } else {
          loadMeasure(i);
        }
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
        var i = measures.indexOf(currentMeasure);
        if(i < measures.length - 1) {
          loadMeasure(++i);
        } else {
          loadMeasure(i);
        }
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

  }

  return {
    // get the singleton instance if one exists
    // or create one if it doesn't
    getInstance: function(data) {
      if (!instance || (instance && data)) {
        instance = init(data);
        loadData();
        populateMeasures();
        loadMeasure(0);
      }
      return instance;
    }

  };
});
