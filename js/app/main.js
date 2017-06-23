
define(['app/metronome', 'app/userControls'], function(metronome, ui){

  // TODO define global metronome data object before anything else,
  // possibly inside a requirejs function

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
    ui.update();
  });

  $("#deleteRowButton").click(function(){
    ui.deleteRow();
  });

  $("#saveRowButton").click(function(){
    ui.save();
  });

  $("#addRowBeforeButton").click(function(){
    var data = {};
    ui.unshift(data);
  });

  $("#addRowAfterButton").click(function(){
    var data = {};
    ui.push(data);
  });

});
