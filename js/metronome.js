var ctx = null;           // the drawing context
var display = null;       // the canvas element
var audioContext = null;  // audio context 
var thickness = 25;   // the thickness of the egede of the metronome box
var lookahead = 25.0;       // How frequently to call scheduling function 
var isPlaying = false;

// colorscheme for metronome screen
var backgroundColor = "rgba(196, 226, 196, 1)";
var segmentOn = "rgba(9, 9, 9, 1)";
var segmentOff = "rgba(175, 203, 175, 1)";

// create <canvas> element and add it to document
function init() {
  var canvas = document.createElement("canvas");
  canvas.id = "metronome-canvas";
  canvas.setAttribute("height", 400);
  canvas.setAttribute("width", 600);
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(canvas);

  // initialize digital number display
  display = new SegmentDisplay("metronome-canvas", 0, 0, 0.4);
  display.pattern         = "#";
  display.cornerType      = 2;
  display.displayType     = 7;
  display.displayAngle    = 9;
  display.digitHeight     = 20;
  display.digitWidth      = 12;
  display.digitDistance   = 2;
  display.segmentWidth    = 3;
  display.segmentDistance = 0.5;
  display.colorOn         = segmentOn;
  display.colorOff        = segmentOff;

  // start drawing loop
  ctx = document.getElementById('metronome-canvas').getContext('2d');
  audioContext = new AudioContext();
  window.requestAnimationFrame(draw);

  timerWorker = new Worker("js/metronomeworker.js");

  timerWorker.onmessage = function(e) {
      if (e.data == "tick") {
          console.log("tick!");
          //scheduler();
      }
      else
          console.log("message: " + e.data);
  };
  timerWorker.postMessage({"interval":lookahead});

}

function play() {
    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        return "play";
    }
}

function draw() {
  // do drawing stuff
  drawBox(); 
  drawDisplay();
  // update anim for next frame
  update();
  window.requestAnimationFrame(draw);
}

function drawBox() {
  roundedRect(ctx, 0, 0, 600, 400, 12, "black");
  roundedRect(ctx, thickness, thickness, 550, 350, 12, backgroundColor);
}

function drawDisplay() {
  display.setValue('1');
}

// utility function for drawing rectangles with rounded corners
function roundedRect(ctx,x,y,width,height,radius, color){
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.arcTo(x,y+height,x+radius,y+height,radius);
  ctx.lineTo(x+width-radius,y+height);
  ctx.arcTo(x+width,y+height,x+width,y+height-radius,radius);
  ctx.lineTo(x+width,y+radius);
  ctx.arcTo(x+width,y,x+width-radius,y,radius);
  ctx.lineTo(x+radius,y);
  ctx.arcTo(x,y,x,y+radius,radius);
  ctx.fillStyle = color;
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function update() {
  // update the animation for the next frame


}

window.onload = function() {
  init();
};
