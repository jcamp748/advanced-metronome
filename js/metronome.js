var ctx = null;
var display = null;

// create <canvas> element and add it to document
function init() {
  var canvas = document.createElement("canvas");
  canvas.id = "metronome-canvas";
  canvas.setAttribute("height", 400);
  canvas.setAttribute("width", 600);
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(canvas);

  // initialize digital number display
  display = new SegmentDisplay("metronome-canvas");
  display.pattern         = "#";
  display.cornerType      = 2;
  display.displayType     = 7;
  display.displayAngle    = 9;
  display.digitHeight     = 20;
  display.digitWidth      = 12;
  display.digitDistance   = 2;
  display.segmentWidth    = 3;
  display.segmentDistance = 0.5;
  display.colorOn         = "rgba(0, 0, 0, 0.9)";
  display.colorOff        = "rgba(0, 0, 0, 0.1)";

  // start drawing loop
  ctx = document.getElementById('metronome-canvas').getContext('2d');
  window.requestAnimationFrame(draw);
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
  roundedRect(ctx, 25, 25, 550, 350, 12, "white");
}

function drawDisplay() {
  display.setValue(1);
}

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
