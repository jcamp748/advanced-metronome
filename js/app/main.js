
define(['app/metronome'], function(metronome){
  metronome.loadData({one: "one", two: "two"});
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
});
