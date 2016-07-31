var ctx = null;                 // the drawing context
var audioContext = null;        // audio context 
var thickness = 25;             // the thickness of the egede of the metronome box
var lookahead = 25.0;           // How frequently to call scheduling function 
var isPlaying = false;
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
var tempo = 0;                  // tempo (in beats per minute)
var nextNoteTime = 0.0;         // when the next note is due.
var timesig = "";               // current time signature
var currentBeat = 0;
var beatUnit = 4;               //the bottom number of a time signature
var beatsPerMeasure = 0;        //the top number of a time signature
var notesInQueue = [];          // the notes that have been put into the web audio,
var noteLength = 0.05;          // length of "beep" (in seconds)
var measureCount = 0;           // number of measures left to play at current tempo
var sectionName = "";           // name of the current section
var sectionNumber = 0;         // section number we are currently playing

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
var sectionData = {};           // empty object to hold current section of the metronome
var playData = {};              // empty object to hold which section will be played
var subset = false;             // should we play a subset of the metronomeData?
var sectionNumber = 0;          // section of the metronomeData hash we are on
var playNumber = 0;             // current index of the playData hash we are on

// colorscheme for metronome screen
var backgroundColor = "rgba(196, 226, 196, 1)";
var segmentOn = "rgba(9, 9, 9, 1)";
var segmentOff = "rgba(175, 203, 175, 1)";


function play() {
    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        //loadSection(sectionNumber);
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        return "play";
    }
}

// utility function to clear table
function clearTable() {
  // delete all elements under tbody
  $("#metro-table tbody").empty();
  metronomeData = {};
}

function loadSection(sec) {
  // get data from first table entry and set
  // measureCount, currentBeat, beatUnit, beatsPerMeasure, tempo, measureCount
  console.log("load section " + sec);
  sectionNumber = sec;
  // highlight current row
  highlightRow(sec + 1);
  // unhighlight previous row
  if ( sec > 0 ) highlightRow(sec);
  var currentSection = metronomeData[sec.toString()];
  if( currentSection ) {
    timesig = currentSection["timesig"];
    // break up the first and second numbers
    beatsPerMeasure = timesig.split("/")[0];
    beatUnit = timesig.split("/")[1];

    
    tempo = currentSection["tempo"];
    measureCount = currentSection["count"];
    sectionName = currentSection["section"];
  } else {
    // check for loop
    if( !$("#loop-checkbox").prop("checked") )
      $("#metronome-controls").children(":nth-child(1)").click();
    else 
      reset();
  }
}

function reset() {
  playData = metronomeData;
  // reset all variables to zero and loadSection(0)
  currentBeat = 0;
  playNumber = 0;
  subset = false;

  // remove all highlighting
  $("#metro-table tbody tr").removeClass("highlight");
  var first = Object.keys(playData)[0];
  console.log(first.toString());
  //loadSection(0);
  loadSection(first);
}

// called when user clicks button to add section
function addSection(button) {
  subset = true;
  var $button = $(button);
  var index = getIndex( $button.parent().parent() );
  delete playData[index.toString()];
  //console.log(JSON.stringify(playData, null, 4));
  if( $button.hasClass("add-section") ) {
    // remove the section from playData
    $button.text("include").toggleClass("add-section");
  } else {
    // add section to playData
    $button.text("remove").toggleClass("add-section");
    playData[index.toString()] = genSection($button);
    //console.log(JSON.stringify(playData, null, 4));
  }
}

function validate() {
  var text = "";
  var validForm = true;
  sectionData = {};
  
  text = $("#timeInput").val();
  if( checkTimeSig(text) ) {
    sectionData["timesig"] = text;
  } else {
    sectionData = {};
    $("#timeInput").parent().toggleClass("has-error");
    $("#timeInput").next().text("time sig cant be blank");
    validForm = false;
  }

  text = $("#tempoInput").val();
  if( checkTempo(text) ) {
    sectionData["tempo"] = text;
  } else {
    sectionData = {};
    $("#tempoInput").parent().toggleClass("has-error");
    $("#tempoInput").next().text("tempo must be between 1 and 400");
    validForm = false;
  }

  text = $("#countInput").val();
  if( checkCount(text) ) {
    sectionData["count"] = text;
  } else {
    sectionData = {};
    $("countInput").parent().toggleClass("has-error");
    $("countInput").next().text("enter a number between 1 and 9999");
    validForm = false;
  }

  text = $("#sectionInput").val();
  if( checkSection(text) ) {
    sectionData["section"] = text;
  } else {
    sectionData = {};
    $("sectionInput").parent().toggleClass("has-error");
    $("sectionInput").next().text("section must have a name");
    validForm = false;
  }
  if( validForm ) {
    metronomeData[sectionNumber.toString()] = sectionData;
    //console.log(JSON.stringify(metronomeData[sectionNumber.toString()], null, 4));
    //console.log(JSON.stringify(metronomeData, null, 4));
    sectionNumber++;
  }

  if(validForm) addRow(genRow(sectionData));
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
      if (measureCount === 0) {
        if (subset) {
          // get the next section from playData
          sectionNumber = playNumber++;
        } else {
          // get the next section from metronomeData
          sectionNumber++;
        }

        currentBeat = 0;
        loadSection(sectionNumber);
      }
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
  sigValue.setValue(timesig.toString());
  sectionLabel.setValue('section');
  sectionValue.setValue(sectionName);
}


function init() {

  // create QUnit fixture
  var qu = $('<div></div>').attr("id", "qunit");
  $("body").append(qu);

  var qfix = $('<div></div>').attr("id", "qunit-fixture");
  $("body").append(qfix);

  // create a div to put the metronome display in
  var displayWrapper = $('<div></div>').attr("id", "display-wrapper");

  // create canvas element to draw metronome display on
  var canvas = $('<canvas></canvas>')
    .attr("id", "metronome-canvas")
    .attr("height", 400)
    .attr("width", 600);
  // add <canvas> to display div
  displayWrapper.append(canvas);

  // add display div to root div
  var wrapper = $("#metronome-wrapper").append(displayWrapper);
  wrapper.addClass("container");

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
  var controls = $('<div></div>').attr("id", "metronome-controls");
  var playButton = $('<button></button>')
    .attr("onclick", "this.innerText = play()")
    .text("play")
    .addClass("metronome-control");
  controls.append(playButton);

  //var resetButton = document.createElement("button");
  var resetButton = $('<button></button>')
    .attr("onclick", "reset()")
    .text("reset")
    .addClass("metronome-control");
  controls.append(resetButton);

  var editButton = $('<button></button>')
    .attr("onclick", "$('#form-wrapper').toggle()")
    .text("edit")
    .addClass("metronome-control");
  controls.append(editButton);
  wrapper.append(controls);

  //var newButton = document.createElement("button");
  var newButton = $('<button></button>')
    .attr("onclick", "$('#form-wrapper').toggle()")
    .text("new")
    .addClass("metronome-control");
  controls.append(newButton);
  wrapper.append(controls);

  // fire event to load form
  var ev = new Event('metronome loaded');
  document.dispatchEvent(ev);


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
