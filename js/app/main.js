// this is the entry point for the entire application

define(["app/metronome", "app/metronomeTable", "app/song", "app/testSuite"], function(metronome, table, song, test){

  //// define global metronome data object before anything else
  //window.song = song.getInstance();
  table.initialize();


  //// add metronome as an observer to the song
  song.getInstance().addObserver(metronome);

  // logic for metronome controls
  $("#skipBackButton").click(function(){
    song.getInstance().skipBack();
  });

  $("#rewindButton").click(function(){
    song.getInstance().rewind();
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    song.getInstance().play();
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    song.getInstance().pause();
  });

  $("#fastForwardButton").click(function(){
    song.getInstance().fastForward();
  });

  $("#skipForwardButton").click(function(){
    song.getInstance().skipForward();
  });

  $("#resetButton").click(function(){
    song.getInstance().reset();
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
    song.getInstance().save();
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
