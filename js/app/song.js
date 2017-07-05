define(["app/subject"], function(subject) {

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
    getMeasure: function() {
      return measure;
    },

    getTime: function() {
      return time;
    },

    create: function() {
      var song = subject.create();
      song.metronomeData = {};
      
      // load data from server
      song.metronomeData = loadData();
      return song;
    }
  };
});
