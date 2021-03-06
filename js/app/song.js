define(["worker!app/metronomeWorker.js", "app/subject"], function(worker, subject) {
  var instance = null;
  var metronomeData = null;
  var measures = [];
  var loop = [];
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
    // set lead in measure
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

  function loadSection(sectionNumber) {
    // load the first measure of `sectionNumber`
    let metroData = window.song.getMetronomeData();
    var len = Object.keys(metroData).length;

    // skip past the first N measures
    var totalMeasures = 0;
    for (var i = 0; i < len; i++ ) {
      if ( window.song.getMeasureData() == metroData[i] ) {
        break;
      } else {
	totalMeasures += parseInt(metroData[i].count);
      }
    }

    // load the next measure
    loadMeasure(totalMeasures);
  }

  function scheduleMeasure() {
    // use the TIME variable to figure out what measure we are on
    // then call loadMeasure()
    var t = time;
    for(var i=0; i < measures.length; i++) {
      var ms = ( 1 / parseInt(measures[i].tempo) ) * 60 * 1000;
      var beatsPerMeasure = measures[i].timesig.split("/")[0];
      var end = t + (ms * beatsPerMeasure);
      if(t < time && time < end) {
        // get the index of this measure and load it
        loadMeasure(i);
        return;
      } else if(t == time) {
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
    }
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

  function updateDataDivs() {
    //update all data-* divs
    $dataDivs = $(".dataDiv");
    for(var i = 0; i < $dataDivs.length; i++) {
      var key = Object.keys(currentMeasure)[i];
      var selector = "data-" + Object.keys(currentMeasure)[i];
      //$( $dataDivs[i] ).data(key, currentMeasure[key]);
      $( "div[" + selector + "]" ).attr(selector, currentMeasure[key]);

    }
  }

  function updateLoop() {
    var $rows = $("#metronomeTable tbody").children();
  }

  function setLeadInMeasure() {
    var first = measures[1];
    var lead = {
        "timesig" : first.timesig,
        "tempo" : first.tempo,
        "count" : "1",
        "section" : "lead in"
      };
    metronomeData[0] = lead;
  }

  // return an array of ints representing the repeat loop
  function getLoop() {
    var rows = $("#metronomeTable tbody").children();
    var length = rows.length;
    var loop = [];
    for(var i = 0; i < length; i++) {
      var row = rows[i];
      if( $(row).children(":last-child").children().is(":checked") ) {
        loop.push(i);
      }
    }
    return loop;
  }

    // private methods

    // return public methods and variables
    return _.extend({
      updateLoop: function() { updateLoop(); },
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
      getMeasureData: function() {
        if(measure == 0) {
          return measures[1]
        } else {
          return currentMeasure;
        }
      },

      setMeasure: function(number) {
        // set the metronomeData when user clicks on row
        loadMeasure(number);

      },
      //updateMeasures: function() {populateMeasures();},
      getTime: function() {return time;},

      editData: function(data) {
        loadData(data);
        populateMeasures();
        updateDataDivs();
        loadMeasure(1);
        // set lead in measure
        setLeadInMeasure();
        this.notify(this);
      },

      save: function() {
        // write xhr request code here
        console.log("saved to server");
        this.notify(this);
      },

      // go forward 1 section
      skipBack: function() {
        var i = measure;
        var loop = getLoop();
        // check if loop array has any elements
        if( loop.length ) {
          if( loop[i - 1] ) {
            loadMeasure(loop[i--]);
          } else {
            loadMeasure(loop[loop.length - 1]);
          }
        } else {
          if(i > 1) {
            loadMeasure(--i);
          } else {
            loadMeasure(i);
          }
        }
        updateDataDivs();
        this.notify(this);
      },

      // go back 1 measure
      rewind: function() {
        console.log("rewind metronome");
        updateDataDivs();
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

      // go forward 1 measure
      fastForward: function() {
        console.log("fast forward");
        updateDataDivs();
        this.notify(this);
      },

      // go forward one section
      skipForward: function() {
        // get the length of Metronme Data Hash
	let metroData = window.song.getMetronomeData();
        var len = Object.keys(metroData).length;
	var nextSection = 0;

        // figure what the current section is
        for(var i = 0; i < len; i++) {
          if ( window.song.getMeasureData() == metroData[i] ) {
	    console.log("get section: " + i++);
	    nextSection = i++;
	    break;
          }
        }
        var loop = getLoop();
        // check if loop array has any elements
        if( loop.length ) {
          if( loop[i + 1] ) {
            loadSection(loop[i++]);
          } else {
            loadSection(loop[0]);
          }
        } else {
          if(i < measures.length - 1) {
            loadSection(++i);
          } else {
            loadSection(i);
          }
        }
        updateDataDivs();
        this.notify(this);
      },

      reset: function() {
        console.log("reset to beginning of song");
        loadMeasure(1);
        updateDataDivs();
        this.notify(this);
      },

      seekTo: function() {
        console.log("seek in song");
        updateDataDivs();
        this.notify(this);
      },

      increaseTempo: function() {
        tempo++;
        updateDataDivs();
        this.notify(this);
      },

      decreaseTempo: function() {
        tempo--;
        updateDataDivs();
        this.notify(this);
      },
    }, subject);

});
