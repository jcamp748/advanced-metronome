var interval = 200;
var metroTimer = null;

onmessage = function(e) {
  if (e.data == "start") {
    metroTimer = setInterval(function(){
      console.log("tick");
    }, interval);
  } else if (e.data == "pause") {
    if (metroTimer) {
      clearInterval(metroTimer);
    }
  }
    
};
