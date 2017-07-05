
define(["app/metronome", "app/userControls", "app/song"], function(metronome, ui, song){

  // define global metronome data object before anything else
  window.song = song.create();

  function loadData() {
    console.log("xhr request for data");
  }

  // logic for metronome controls

  $("#skipBackButton").click(function(){
    ui.skipBack();
  });

  $("#rewindButton").click(function(){
    ui.rewind();
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    ui.play();
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    ui.pause();
  });

  $("#fastForwardButton").click(function(){
    ui.fastForward();
  });

  $("#skipForwardButton").click(function(){
    ui.skipForward();
  });

  $("#resetButton").click(function(){
    ui.reset();
  });

  $("#editButton").click(function(){
    ui.edit();
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
