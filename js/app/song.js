define(["worker!app/metronomeWorker.js", "app/subject"], function(worker, subject) {
  var instance = null; 
  var metronomeData = null; 
  var measures = [];
  var currentMeasure = {};
  var measure = 0;
  var currentBeat = 0;
  var time = 0;              // ms
  var clockInterval = 100;   // 100ms
  var tickInterval = 0;
  var timeout = null;

  function prettyTime(ms) {
    // display milliseconds in the form #.#
    var s = Math.floor(ms/1000);
    var r = ms % 1000;
    var h = Math.floor(r/100);
    var string = s.toString() + "." + h.toString();
    return string;
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

  function scheduleTick() {
    // use the CURRENTMEASURE variable to set the TICKINTERVAL
    tickInterval = ( 1 / currentMeasure.tempo ) * 60 * 1000;
  }

  function loadMeasure(measureNumber) {
    currentMeasure = measures[measureNumber];
    measure = measureNumber;
    currentBeat = 0;
    scheduleTick();
  }

  function scheduleMeasure() {
    // use the TIME variable to figure out what measure we are on
    // then call loadMeasure()
    var t = 0; //ms
    measures.forEach(function(m, i, a) {
      var ms = ( 1 / parseInt(m.tempo) ) * 60 * 1000;
      var beatsPerMeasure = m.timesig.split("/")[0];
      var end = t + (ms * beatsPerMeasure);
      debugger
      if(t < time && time < end) {
        // get the index of this measure and load it
        loadMeasure(i);
        return;
      } else if(t == time) {
        debugger;
        // get the index of this measure and load it
        loadMeasure(i);
        return;
      } else if(end == time) {
        // get the index of the next measure and load it
        loadMeasure(++i);
        return;
      } else if( time > end) {
        // something went wrong we overshot the time somehow
        console.log("something went wrong in the scheduleMeasure function");
      } else {
        // t < time, keep going  
      }        
      t += end;
    });
  }


  function loadData(data) {
    if(data) {
      metronomeData = data;
    } else {
      // load data via xhr request
      var success = false;
      // make xhr request for data
      //
      //
      var req = new XMLHttpRequest();
      req.open('GET', "testData.json");
      req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status === 200) {
          // TODO do some validation testing on this response
          metronomeData = JSON.parse(this.response);
          populateMeasures();
          loadMeasure(0);
          console.log("xhr request for data succeeded!");
          $("#resetButton").click();
        } 
      };
      req.send();
    }
  }

  worker.onmessage = function(e){
    console.log(e.data);
  };

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
        var i = measure;
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
        scheduleMeasure();
        var start = Date.now();
        var expected = start + clockInterval;
        var last = start;
        timeout = setTimeout(step, clockInterval);
        function step() {
          var now = Date.now();
          var elapsed = now - last;
          last = now;
          var dt = now - expected; 
          if (dt > clockInterval) {
            // something unexpected happened
          }
          time += elapsed;
          expected += clockInterval;
          timeout = setTimeout(step, Math.max(0, clockInterval - dt));
          $("#clock-display").text(prettyTime(time));
        }

        var message = {action: "start", interval: tickInterval};
        worker.postMessage(message);
        this.notify(this);
      },

      pause: function() {
        console.log("pause song");
        clearTimeout(timeout);
        var message = {action: "pause", interval: tickInterval};
        worker.postMessage(message);
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
