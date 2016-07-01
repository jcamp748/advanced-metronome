// create a form for creating a new metronome 
  var wrapper = document.getElementById("metronome-wrapper");

  var timeLabel = document.createElement("label");
  timeLabel.setAttribute("for", "timeSigInput");
  timeLabel.textContent = "Time Signature";
  wrapper.appendChild(timeLabel);

