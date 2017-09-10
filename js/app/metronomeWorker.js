var interval = 200;
var metroTimer = null;

onmessage = function(e) {
  interval = e.data.interval;
  if (e.data.action == "start") {
    metroTimer = setInterval(function(){
      postMessage("tick");
    }, interval);
  } else if (e.data.action == "pause") {
    if (metroTimer) {
      clearInterval(metroTimer);
    }
  }
    
};
