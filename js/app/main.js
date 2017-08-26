// this is the entry point for the entire application

define(["app/metronome", "app/metronomeTable", "app/song", "app/testSuite", "app/subject"], function(metronome, table, song, test, subject){

  _.extend(song, subject);
  //// define global metronome data object before anything else
  //window.song = song.;
  table.initialize();


  //// add metronome as an observer to the song
  song.addObserver(metronome);

  // logic for metronome controls
  $("#skipBackButton").click(function(){
    song.skipBack();
    song.notify(song);
  });

  $("#rewindButton").click(function(){
    song.rewind();
    song.notify(song);
  });

  $("#playButton").click(function(){
    $(this).attr("disabled", true);
    $("#pauseButton").attr("disabled", false);
    song.play();
    song.notify(song);
  });

  $("#pauseButton").click(function(){
    $(this).attr("disabled", true);
    $("#playButton").attr("disabled", false);
    song.pause();
    song.notify(song);
  });

  $("#fastForwardButton").click(function(){
    song.fastForward();
    song.notify(song);
  });

  $("#skipForwardButton").click(function(){
    song.skipForward();
    song.notify(song);
  });

  $("#resetButton").click(function(){
    song.reset();
    song.notify(song);
  });

  $("#editButton").click(function(){
    table.edit();
    song.notify(song);
  });

  $("#updateRowButton").click(function(){
    table.updateRow();
    song.notify(song);
  });

  $("#deleteRowButton").click(function(){
    table.deleteRow();
    song.notify(song);
  });

  $("#saveRowButton").click(function(){
    song.save();
    song.notify(song);
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
