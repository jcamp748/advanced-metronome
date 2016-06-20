
// create <canvas> element and add it to document
function init() {
  var canvas = document.createElement("canvas");
  canvas.setAttribute("height", 150);
  canvas.setAttribute("width", 150);
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(canvas);
}

window.onload = function() {
  init();
};
