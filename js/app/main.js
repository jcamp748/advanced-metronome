
define(["app/metronome", "app/metronomeTable", "app/song"], function(metronome, table, song){

  // define global metronome data object before anything else
  window.song = song.create();


  // logic for metronome controls

  $("#skipBackButton").click(function(){
    song.skipBack();
  });

  $("#rewindButton").click(function(){
    song.rewind();
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    song.play();
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    song.pause();
  });

  $("#fastForwardButton").click(function(){
    song.fastForward();
  });

  $("#skipForwardButton").click(function(){
    song.skipForward();
  });

  $("#resetButton").click(function(){
    song.reset();
  });

  $("#editButton").click(function(){
    table.edit();
  });

  $("#updateRowButton").click(function(){
    table.updateRow();
  });

  $("#deleteRowButton").click(function(){
    table.deleteRow();
  });

  $("#saveRowButton").click(function(){
    song.save();
  });

  $("#addRowBeforeButton").click(function(){
    // create a blank section object
    var $row = table.create(); 
    // insert the section before the highlighted row
  });

  $("#addRowAfterButton").click(function(){
    // create a blank section object
    var $row = table.create(); 
    // insert the section after the highlighted row
  });

  table.initialize();

});
