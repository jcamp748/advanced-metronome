var ctx = null;                 // the drawing context
var audioContext = null;        // audio context 
var thickness = 25;             // the thickness of the egede of the metronome box
var lookahead = 25.0;           // How frequently to call scheduling function 
var isPlaying = false;
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
var tempo = 120.0;              // tempo (in beats per minute)
var nextNoteTime = 0.0;         // when the next note is due.
var currentBeat = 0;
var beatUnit = 4;               //the bottom number of a time signature
var beatsPerMeasure = 4;        //the top number of a time signature
var notesInQueue = [];          // the notes that have been put into the web audio,
var noteLength = 0.05;          // length of "beep" (in seconds)
var measureCount = 4;           // number of measures left to play at current tempo

var beatValue = null;           // display beat number 
var sigLabel = null;            // label for time signature
var sigValue = null;            // value of time signature
var tempoValue = null;          // tempo in bpm
var tempoLabel = null;          // label for tempo
var countLabel = null;          // label for how many measures are left
var countValue = null;          // how many measures left in current time sig and tempo
var sectionLabel = null;        // label for section
var sectionValue = null;        // name of the current section

var metronomeData = {};         // empty object to hold all the sections of the metronome
var sectionNumber = 0;          // section of the metronome hash we are on

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

function reset() {
  measureCount = 4;
  currentBeat = 0;
}

function validate() {
  var text = "";
  var tempData = {};
  var validForm = true;
  
  //id = timeInput 
  text = document.getElementById("timeInput").value;
  if( checkTimeSig(text) ) {
    tempData["timesig"] = text;
  } else {
    tempData = {};
    $("#timeInput").parent().toggleClass("has-error");
    $("#timeInput").next().text("time sig cant be blank");
    validForm = false;
  }

  //id = tempoInput
  text = document.getElementById("tempoInput").value;
  if( checkTempo(text) ) {
    tempData["tempo"] = text;
  } else {
    tempData = {};
    $("#tempoInput").parent().toggleClass("has-error");
    $("#tempoInput").next().text("tempo must be between 1 and 400");
    validForm = false;
  }

  //id = countInput
  text = document.getElementById("countInput").value;
  if( checkCount(text) ) {
    tempData["count"] = text;
  } else {
    tempData = {};
    $("countInput").parent().toggleClass("has-error");
    $("countInput").next().text("enter a number between 1 and 9999");
    validForm = false;
  }

  //id = sectionInput 
  text = document.getElementById("sectionInput").value;
  if( checkSection(text) ) {
    tempData["section"] = text;
  } else {
    tempData = {};
    $("sectionInput").parent().toggleClass("has-error");
    $("sectionInput").next().text("section must have a name");
    validForm = false;
  }
  if( validForm ) {
    metronomeData[sectionNumber.toString()] = tempData;
    //console.log(JSON.stringify(metronomeData[sectionNumber.toString()], null, 4));
    console.log(JSON.stringify(metronomeData, null, 4));
    sectionNumber++;
  }

  if(validForm) addRow(tempData);
  tempData = {};
}

function checkSection( userInput ) {
  // verify 1 <= section <= 18
  var strlen = userInput.length;
  if( strlen < 1 || strlen > 18 )
    return false;
  return true;
}

function checkCount( userInput ) {
  // verify 1 <= count <= 9999
  var number = parseInt(userInput);
  if( isNaN(number) )
    return false;
  if( number < 1 || number > 9999 )
    return false;
  return true;
}

function checkTempo( userInput ) {
  // verify 1 <= tempo <= 400
  var number = parseInt(userInput);
  if( isNaN(number) )
    return false;
  if( number < 1 || number > 400 )
    return false;
  return true;
}

function checkTimeSig( userInput ) {
  // verify time sig is of the form N/M where 
  // 1 <= N <= 9 and M == 2 || 4 || 8
  var validSig = /[1-9]\/[248]/;
  var valid = validSig.test(userInput);
  //console.log(valid);
  return valid;
}

function newMetronome() {
  // display a form
  $("#form-wrapper").toggle();
}


function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat;       // Add beat length to last beat time
    if(currentBeat === 0) {
      measureCount--;
    }

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
    displayBeat = beatsPerMeasure;
  beatValue.setValue(displayBeat.toString());
  tempoLabel.setValue('tempo');
  tempoValue.setValue(tempo.toString());
  countLabel.setValue('count');
  countValue.setValue(measureCount.toString());
  sigLabel.setValue('sig');
  sigValue.setValue('4/4');
  sectionLabel.setValue('section');
  sectionValue.setValue('riff a');
}


function init() {

  // create QUnit fixture
  var qu = document.createElement("div");
  qu.setAttribute("id", "qunit");
  $("body").append(qu);

  var qfix = document.createElement("div");
  qfix.setAttribute("id", "qunit-fixture");
  $("body").append(qfix);

  // create a div to put the metronome display in
  var displayWrapper = document.createElement("div");
  displayWrapper.setAttribute("id", "display-wrapper");

  // create canvas element to draw metronome display on
  var canvas = document.createElement("canvas");
  canvas.id = "metronome-canvas";
  canvas.setAttribute("height", 400);
  canvas.setAttribute("width", 600);
  // add <canvas> to display div
  displayWrapper.appendChild(canvas);

  // add display div to root div
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(displayWrapper);

  // initialize digital number display
  beatValue = new SegmentDisplay("metronome-canvas", 0, 0, 0.2);

  beatValue.pattern         = "#";
  beatValue.cornerType      = 2;
  beatValue.displayType     = 7;
  beatValue.displayAngle    = 9;
  beatValue.digitHeight     = 20;
  beatValue.digitWidth      = 12;
  beatValue.digitDistance   = 2;
  beatValue.segmentWidth    = 3;
  beatValue.segmentDistance = 0.5;
  beatValue.colorOn         = segmentOn;
  beatValue.colorOff        = segmentOff;

  sigLabel = new SegmentDisplay("metronome-canvas", 80, 10, 0.12);

  sigLabel.pattern         = "###";
  sigLabel.cornerType      = 2;
  sigLabel.displayType     = 7;
  sigLabel.displayAngle    = 9;
  sigLabel.digitHeight     = 20;
  sigLabel.digitWidth      = 12;
  sigLabel.digitDistance   = 2;
  sigLabel.segmentWidth    = 1;
  sigLabel.segmentDistance = 0.5;
  sigLabel.segmentCount    = 14;
  sigLabel.colorOn         = segmentOn;
  sigLabel.colorOff        = segmentOff;

  sigValue = new SegmentDisplay("metronome-canvas", 80, 50, 0.12);

  sigValue.pattern         = "###";
  sigValue.cornerType      = 2;
  sigValue.displayType     = 7;
  sigValue.displayAngle    = 9;
  sigValue.digitHeight     = 20;
  sigValue.digitWidth      = 12;
  sigValue.digitDistance   = 2;
  sigValue.segmentWidth    = 1;
  sigValue.segmentDistance = 0.5;
  sigValue.segmentCount    = 14;
  sigValue.colorOn         = segmentOn;
  sigValue.colorOff        = segmentOff;

  tempoValue = new SegmentDisplay("metronome-canvas", 200, 50, 0.2);

  tempoValue.pattern         = "###";
  tempoValue.cornerType      = 2;
  tempoValue.displayType     = 7;
  tempoValue.displayAngle    = 9;
  tempoValue.digitHeight     = 20;
  tempoValue.digitWidth      = 12;
  tempoValue.digitDistance   = 2;
  tempoValue.segmentWidth    = 3;
  tempoValue.segmentDistance = 0.5;
  tempoValue.colorOn         = segmentOn;
  tempoValue.colorOff        = segmentOff;

  tempoLabel = new SegmentDisplay("metronome-canvas", 200, 10, 0.2);

  tempoLabel.pattern         = "#####";
  tempoLabel.cornerType      = 2;
  tempoLabel.displayType     = 7;
  tempoLabel.displayAngle    = 9;
  tempoLabel.digitHeight     = 20;
  tempoLabel.digitWidth      = 12;
  tempoLabel.digitDistance   = 2;
  tempoLabel.segmentWidth    = 1;
  tempoLabel.segmentDistance = 0.5;
  tempoLabel.segmentCount    = 14;
  tempoLabel.colorOn         = segmentOn;
  tempoLabel.colorOff        = segmentOff;

  countLabel = new SegmentDisplay("metronome-canvas", 400, 10, 0.2);

  countLabel.pattern         = "#####";
  countLabel.cornerType      = 2;
  countLabel.displayType     = 7;
  countLabel.displayAngle    = 9;
  countLabel.digitHeight     = 20;
  countLabel.digitWidth      = 12;
  countLabel.digitDistance   = 2;
  countLabel.segmentWidth    = 1;
  countLabel.segmentDistance = 0.5;
  countLabel.segmentCount    = 14;
  countLabel.colorOn         = segmentOn;
  countLabel.colorOff        = segmentOff;

  countValue = new SegmentDisplay("metronome-canvas", 400, 70, 0.2);

  countValue.pattern         = "#####";
  countValue.cornerType      = 2;
  countValue.displayType     = 7;
  countValue.displayAngle    = 9;
  countValue.digitHeight     = 20;
  countValue.digitWidth      = 12;
  countValue.digitDistance   = 2;
  countValue.segmentWidth    = 3;
  countValue.segmentDistance = 0.5;
  countValue.segmentCount    = 7;
  countValue.colorOn         = segmentOn;
  countValue.colorOff        = segmentOff;

  sectionLabel = new SegmentDisplay("metronome-canvas", 0, 200, 0.8);

  sectionLabel.pattern         = "##################";
  sectionLabel.cornerType      = 2;
  sectionLabel.displayType     = 7;
  sectionLabel.displayAngle    = 9;
  sectionLabel.digitHeight     = 20;
  sectionLabel.digitWidth      = 12;
  sectionLabel.digitDistance   = 2;
  sectionLabel.segmentWidth    = 1;
  sectionLabel.segmentDistance = 0.5;
  sectionLabel.segmentCount    = 14;
  sectionLabel.colorOn         = segmentOn;
  sectionLabel.colorOff        = segmentOff;

  sectionValue = new SegmentDisplay("metronome-canvas", 0, 270, 0.8);

  sectionValue.pattern         = "##################";
  sectionValue.cornerType      = 2;
  sectionValue.displayType     = 7;
  sectionValue.displayAngle    = 9;
  sectionValue.digitHeight     = 20;
  sectionValue.digitWidth      = 12;
  sectionValue.digitDistance   = 2;
  sectionValue.segmentWidth    = 1;
  sectionValue.segmentDistance = 0.5;
  sectionValue.segmentCount    = 14;
  sectionValue.colorOn         = segmentOn;
  sectionValue.colorOff        = segmentOff;

  // addControls
  var controls = document.createElement("div");
  controls.setAttribute("id", "metronome-controls");
  var playButton = document.createElement("button");
  playButton.setAttribute("onclick", "this.innerText = play()");
  playButton.textContent = "play";
  playButton.className = "metronome-control";
  controls.appendChild(playButton);

  var resetButton = document.createElement("button");
  resetButton.setAttribute("onclick", "reset()");
  resetButton.textContent = "reset";
  resetButton.className = "metronome-control";
  controls.appendChild(resetButton);

  var newButton = document.createElement("button");
  newButton.setAttribute("onclick", "newMetronome()");
  newButton.textContent = "new";
  newButton.className = "metronome-control";
  controls.appendChild(newButton);
  wrapper.appendChild(controls);

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

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});
