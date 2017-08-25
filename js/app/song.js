define(["worker!app/metronomeWorker.js", "app/subject"], function(worker, subject) {
  var instance = null; 

  function loadData(data) {
    if(data) {
      instance.metronomeData = data;
    } else {
      // load data via xhr request
      var success = false;
      console.log("xhr request for data");
      if(!success) {
        // request failed, fill with dummy data
        instance.metronomeData = {
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
    instance.measures = [];
    for(var section in instance.metronomeData) {
      var count = parseInt(instance.metronomeData[section]["count"]);
      for(var i = 0; i < count; i++) {
        instance.measures.push(instance.metronomeData[section]);
      }
    }
  }

  function loadMeasure(measureNumber) {
    instance.currentMeasure = instance.measures[measureNumber];
    instance.measure = measureNumber;
    instance.currentBeat = 0;
  }

  //worker.onmessage = function(e){
    //console.log("hello from song.js");
    //instance.notify(this);
  //};

  function init(data) {
    data = data || null;
    // private variables
    try {
      instance.time = 0.0;
      instance.measure = 0;
      instance.observers = null;
      instance.measures = [];
      instance.metronomeData = data;
      instance.currentMeasure = {};
      instance.currentBeat = 0;
    } catch(e) {
      console.log(e); 
    }

    // private methods
    
    // return public methods and variables
    return {
      getBeat: function() { return instance.currentBeat; },
      getTempo: function() { return instance.currentMeasure["tempo"]; },
      getCount: function() { return instance.currentMeasure["count"]; },
      getTimeSig: function() { return instance.currentMeasure["timeSig"]; },
      getSectionName: function() { return instance.currentMeasure["section"]; },
      getMeasureNumber: function() { return instance.measure;},
      getMeasureData: function() {return instance.currentMeasure;},
      updateMeasures: function() {
        populateMeasures();
      },
      
      save: function() {
        // write xhr request code here
        console.log("saved to server");
        instance.notify(instance);
      },

      skipBack: function() {
        var i = instance.measure
        if(i > 0) {
          loadMeasure(--i);
        } else {
          loadMeasure(i);
        }
        instance.notify(instance);
      },

      rewind: function() {
        console.log("rewind metronome");
        instance.notify(instance);
      },

      play: function() {
        console.log("play song");
        //worker.postMessage("start");
        instance.notify(instance);
      },

      pause: function() {
        console.log("pause song");
        //worker.postMessage("pause");
        instance.notify(instance);
      },

      fastForward: function() {
        console.log("fast forward");
        instance.notify(instance);
      },

      skipForward: function() {
        var i = instance.measure;
        if(i < instance.measures.length - 1) {
          loadMeasure(++i);
        } else {
          loadMeasure(i);
        }
        instance.notify(instance);
      },

      reset: function() {
        console.log("reset to beginning of song");
        loadMeasure(0);
        instance.notify(instance);
      },

      seekTo: function() {
        console.log("seek in song");
        instance.notify(instance);
      },

      increaseTempo: function() {
        tempo++;
        instance.notify(instance);
      },

      decreaseTempo: function() {
        tempo--;
        instance.notify(instance);
      },
    };

  }

  return {
    // get the singleton instance if one exists
    // or create one if it doesn't
    getInstance: function(data) {
      if (!instance || (instance && data)) {
        instance = init(data);
        loadData(data);
        populateMeasures();
        loadMeasure(0);
        instance = _.extend(instance, subject);
      }
      return instance;
    },

  };
});
