// this is the entry point for the entire application

define(["app/metronome", "app/metronomeTable", "app/song", "app/testSuite"], function(metronome, table, song, test){

  song.getMetronomeData();
  //song has been loaded
  table.initialize();


  //// add metronome as an observer to the song
  song.addObserver(metronome);

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

  //table.initialize();

});
