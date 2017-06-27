
define(['app/metronome', 'app/userControls'], function(metronome, ui){

  // define global metronome data object before anything else
  window.metronomeData = {};
  
  // initialize it for testing purposes
  window.metronomeData = {
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

  // logic for metronome controls

  $("#skipBackButton").click(function(){
    metronome.skipBack();
  });

  $("#rewindButton").click(function(){
    metronome.rewind();
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    metronome.play();
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    metronome.pause();
  });

  $("#fastForwardButton").click(function(){
    metronome.fastForward();
  });

  $("#skipForwardButton").click(function(){
    metronome.skipForward();
  });

  $("#resetButton").click(function(){
    metronome.reset();
  });

  $("#editButton").click(function(){
    metronome.edit();
  });

  $("#updateRowButton").click(function(){
    ui.updateRow();
  });

  $("#deleteRowButton").click(function(){
    ui.deleteRow();
  });

  $("#saveRowButton").click(function(){
    ui.save();
  });

  $("#addRowBeforeButton").click(function(){
    // create a blank section object
    var data = ui.create(); 
    // insert the section before the highlighted row
  });

  $("#addRowAfterButton").click(function(){
    // create a blank section object
    var data = ui.create(); 
    // insert the section after the highlighted row
  });

  ui.initialize();

});
