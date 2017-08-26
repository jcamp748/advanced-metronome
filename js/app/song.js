define(["worker!app/metronomeWorker.js", "app/subject"], function(worker, subject) {
  var instance = null; 
  var metronomeData = null; 
  var measures = [];
  var currentMeasure = {};
  var measure = 0;
  var currentBeat = 0;
  var time = 0.0;

  function loadData(data) {
    if(data) {
      metronomeData = data;
    } else {
      // load data via xhr request
      var success = false;
      // make xhr request for data
      //
      //
      if (success) {
        console.log("xhr request for data succeeded!");
      } else {
        // request failed, fill with dummy data
        console.log("xhr request for data failed.");
        metronomeData = {
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
  }

  function populateMeasures() {
    measures = [];
    for(var section in metronomeData) {
      var count = parseInt(metronomeData[section]["count"]);
      for(var i = 0; i < count; i++) {
        measures.push(metronomeData[section]);
      }
    }
  }

  function loadMeasure(measureNumber) {
    currentMeasure = measures[measureNumber];
    measure = measureNumber;
    currentBeat = 0;
  }

  //worker.onmessage = function(e){
    //console.log("hello from song.js");
    //instance.notify(this);
  //};

    // private methods
    
    // return public methods and variables
    return _.extend({
      getMetronomeData: function() { 
        if(!metronomeData) {
          loadData();
          return metronomeData;
        } else {
          return metronomeData;
        }
      },

      getMeasures: function() { return measures; },
      getBeat: function() { return currentBeat; },
      getTempo: function() { return currentMeasure["tempo"]; },
      getCount: function() { return currentMeasure["count"]; },
      getTimeSig: function() { return currentMeasure["timeSig"]; },
      getSectionName: function() { return currentMeasure["section"]; },
      getMeasureNumber: function() { return measure;},
      getMeasureData: function() {return currentMeasure;},
      updateMeasures: function() {populateMeasures();},

      editData: function(data) {
        metronomeData = data;
        populateMeasures();
        loadMeasure(0);
      },
      
      save: function() {
        // write xhr request code here
        console.log("saved to server");
        this.notify(this);
      },

      skipBack: function() {
        var i = measure
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
        //worker.postMessage("start");
        this.notify(this);
      },

      pause: function() {
        console.log("pause song");
        //worker.postMessage("pause");
        this.notify(this);
      },

      fastForward: function() {
        console.log("fast forward");
        this.notify(this);
      },

      skipForward: function() {
        var i = measure;
        if(i < measures.length - 1) {
          loadMeasure(++i);
        } else {
          loadMeasure(i);
        }
        this.notify(this);
      },

      reset: function() {
        console.log("reset to beginning of song");
        loadMeasure(0);
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
    }, subject);

});
