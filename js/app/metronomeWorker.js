var interval = 200;

onmessage = function(e) {
  if (e.data == "start") {
    setInterval(function(){
      console.log("tick");
    }, interval);
  }
};
