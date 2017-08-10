// this is the entry point for the entire application

define(["app/metronome", "app/metronomeTable", "app/song", "test/controls"], function(metronome, table, song, test){

  //// define global metronome data object before anything else
  window.song = song.getInstance();

  //// add metronome as an observer to the song
  window.song.addObserver(metronome);
  window.song.notify(window.song);
  //window.song.pause();


  // logic for metronome controls

  $("#skipBackButton").click(function(){
    window.song.skipBack();
  });

  $("#rewindButton").click(function(){
    window.song.rewind();
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    window.song.play();
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    window.song.pause();
  });

  $("#fastForwardButton").click(function(){
    window.song.fastForward();
  });

  $("#skipForwardButton").click(function(){
    window.song.skipForward();
  });

  $("#resetButton").click(function(){
    window.song.reset();
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
    window.song.save();
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
