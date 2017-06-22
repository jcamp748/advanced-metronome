
define(['app/metronome'], function(metronome){

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

});
