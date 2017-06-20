
define(['app/metronome'], function(metronome){
  metronome.loadData({one: "one", two: "two"});
  $("#playButton").click(function(){
      console.log("play");
  });
      
  metronome.play();
  metronome.pause();
  metronome.seekTo(30);
});
