var ctx = null;           // the drawing context
var display = null;       // the canvas element
var audioContext = null;  // audio context 
var thickness = 25;   // the thickness of the egede of the metronome box
var lookahead = 25.0;       // How frequently to call scheduling function 
var isPlaying = false;
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
var tempo = 120.0;          // tempo (in beats per minute)
var nextNoteTime = 0.0;     // when the next note is due.
var currentBeat = 0;
var beatUnit = 4;           //the bottom number of a time signature
var beatsPerMeasure = 4;    //the top number of a time signature
var notesInQueue = [];      // the notes that have been put into the web audio,
var noteLength = 0.05;      // length of "beep" (in seconds)

// colorscheme for metronome screen
var backgroundColor = "rgba(196, 226, 196, 1)";
var segmentOn = "rgba(9, 9, 9, 1)";
var segmentOff = "rgba(175, 203, 175, 1)";


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

function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat;       // Add beat length to last beat time

    currentBeat++;    // Advance the beat number, wrap to zero
    if (currentBeat == beatsPerMeasure) {
        currentBeat = 0;
    }
}

function scheduleNote( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );

    // create an oscillator
    var osc = audioContext.createOscillator();
    osc.connect( audioContext.destination );
    //console.log(beatNumber);
    if (beatNumber === 0)    // beat 0 == high pitch
        osc.frequency.value = 880.0;
    else                        // other 16th notes = low pitch
        osc.frequency.value = 440.0;

    osc.start( time );
    osc.stop( time + noteLength );
}

function scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleNote( currentBeat, nextNoteTime );
        nextNote();
    }
}

function draw() {
  // do drawing stuff
  drawBox(); 
  drawDisplay();
  window.requestAnimationFrame(draw);
}

function drawBox() {
  roundedRect(ctx, 0, 0, 600, 400, 12, "black");
  roundedRect(ctx, thickness, thickness, 550, 350, 12, backgroundColor);
}

function drawDisplay() {
  var displayBeat = currentBeat;
  if(currentBeat === 0)
    displayBeat = 4;
  display.setValue(displayBeat.toString());
}


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
          //console.log("tick!");
          scheduler();
      }
      else
          console.log("message: " + e.data);
  };
  timerWorker.postMessage({"interval":lookahead});

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

window.onload = function() {
  init();
};
