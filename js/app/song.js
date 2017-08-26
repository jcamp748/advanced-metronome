define(["worker!app/metronomeWorker.js"], function(worker) {
  var instance = null; 
  var metronomeData = {};
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
      console.log("xhr request for data");
      if(!success) {
        // request failed, fill with dummy data
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

  //function init(data) {
    //data = data || null;
    //// private variables
    //try {
      //time = 0.0;
      //measure = 0;
      //observers = null;
      //measures = [];
      //metronomeData = data;
      //currentMeasure = {};
      //currentBeat = 0;
    //} catch(e) {
      //console.log(e); 
    //}
  //}

    // private methods
    
    // return public methods and variables
    return {
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
      updateMeasures: function() {
        populateMeasures();
      },

      editData: function(data) {
        metronomeData = data;
        populateMeasures();
        loadMeasure(0);
      },
      
      save: function() {
        // write xhr request code here
        console.log("saved to server");
        //instance.notify(instance);
      },

      skipBack: function() {
        var i = measure
        if(i > 0) {
          loadMeasure(--i);
        } else {
          loadMeasure(i);
        }
        //instance.notify(instance);
      },

      rewind: function() {
        console.log("rewind metronome");
        //instance.notify(instance);
      },

      play: function() {
        console.log("play song");
        //worker.postMessage("start");
        //instance.notify(instance);
      },

      pause: function() {
        console.log("pause song");
        //worker.postMessage("pause");
        //instance.notify(instance);
      },

      fastForward: function() {
        console.log("fast forward");
        //instance.notify(instance);
      },

      skipForward: function() {
        var i = measure;
        if(i < measures.length - 1) {
          loadMeasure(++i);
        } else {
          loadMeasure(i);
        }
        //instance.notify(instance);
      },

      reset: function() {
        console.log("reset to beginning of song");
        loadMeasure(0);
        //instance.notify(instance);
      },

      seekTo: function() {
        console.log("seek in song");
        //instance.notify(instance);
      },

      increaseTempo: function() {
        tempo++;
        //instance.notify(instance);
      },

      decreaseTempo: function() {
        tempo--;
        //instance.notify(instance);
      },
    };

  //}

  //return {
    //// get the singleton instance if one exists
    //// or create one if it doesn't
    //getInstance: function(data) {
      //if (!instance || (instance && data)) {
        //instance = init(data);
        //loadData(data);
        //populateMeasures();
        //loadMeasure(0);
        //instance = _.extend(instance, subject);
      //}
      //return instance;
    //},

  //};
});
