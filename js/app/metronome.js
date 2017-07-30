define(["SegmentDisplay/segment-display"], function(segmentDisplay) {

  var ctx = document.getElementById('metronome-canvas').getContext('2d');

  // initialize digital number display
  var beatValue = new segmentDisplay.SegmentDisplay("metronome-canvas", 0, 10, 0.2);

  beatValue.pattern         = "#";
  beatValue.cornerType      = 2;
  beatValue.displayType     = 7;
  beatValue.displayAngle    = 9;
  beatValue.digitHeight     = 20;
  beatValue.digitWidth      = 12;
  beatValue.digitDistance   = 2;
  beatValue.segmentWidth    = 3;
  beatValue.segmentDistance = 0.5;
  beatValue.segmentCount    = 7;
  beatValue.colorOn         = segmentDisplay.segmentOn;
  var sigLabel = new segmentDisplay.SegmentDisplay("metronome-canvas", 80, 10, 0.12);

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
  sigLabel.colorOn         = segmentDisplay.segmentOn;
  sigLabel.colorOff        = segmentDisplay.segmentOff;

  var sigValue = new segmentDisplay.SegmentDisplay("metronome-canvas", 80, 50, 0.12);

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
  sigValue.colorOn         = segmentDisplay.segmentOn;
  sigValue.colorOff        = segmentDisplay.segmentOff;

  var tempoValue = new segmentDisplay.SegmentDisplay("metronome-canvas", 200, 50, 0.2);

  tempoValue.pattern         = "###";
  tempoValue.cornerType      = 2;
  tempoValue.displayType     = 7;
  tempoValue.displayAngle    = 9;
  tempoValue.digitHeight     = 20;
  tempoValue.digitWidth      = 12;
  tempoValue.digitDistance   = 2;
  tempoValue.segmentWidth    = 3;
  tempoValue.segmentDistance = 0.5;
  tempoValue.segmentCount    = 7;
  tempoValue.colorOn         = segmentDisplay.segmentOn;
  var tempoLabel = new segmentDisplay.SegmentDisplay("metronome-canvas", 200, 10, 0.2);

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
  tempoLabel.colorOn         = segmentDisplay.segmentOn;
  tempoLabel.colorOff        = segmentDisplay.segmentOff;

  var countLabel = new segmentDisplay.SegmentDisplay("metronome-canvas", 400, 10, 0.2);

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
  countLabel.colorOn         = segmentDisplay.segmentOn;
  countLabel.colorOff        = segmentDisplay.segmentOff;

  var countValue = new segmentDisplay.SegmentDisplay("metronome-canvas", 400, 70, 0.2);

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
  countValue.colorOn         = segmentDisplay.segmentOn;
  countValue.colorOff        = segmentDisplay.segmentOff;

  var sectionLabel = new segmentDisplay.SegmentDisplay("metronome-canvas", 0, 200, 0.8);

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
  sectionLabel.colorOn         = segmentDisplay.segmentOn;
  sectionLabel.colorOff        = segmentDisplay.segmentOff;

  var sectionValue = new segmentDisplay.SegmentDisplay("metronome-canvas", 0, 270, 0.8);

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
  sectionValue.colorOn         = segmentDisplay.segmentOn;
  sectionValue.colorOff        = segmentDisplay.segmentOff;
  // utility function for drawing rectangles with rounded corners
  function roundedRect(x,y,width,height,radius, color){
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

  function drawUpArrow() {
    // draw a triangle pointing up to increase tempo
    ctx.save();
    ctx.beginPath();
    ctx.translate(380, 80);
    ctx.lineTo(15, -15);
    ctx.lineTo(30, 0);
    ctx.lineTo(0,0);
    if(hoverUp) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.stroke();
    ctx.fill();
    ctx.restore();

  }

  function drawDownArrow() {
    // draw a triangle pointing down to decrease tempo

    ctx.save();
    ctx.beginPath();
    ctx.translate(380, 120);
    ctx.lineTo(15, 15);
    ctx.lineTo(30, 0);
    ctx.lineTo(0,0);
    if(hoverDown) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  // implement up and down arrow click detection
  var arrowBoxes = [
    {x: 380, y: 60, w: 30, h: 30},
    {x: 380, y: 110, w: 30, h: 30}
  ], i = 0, r;

  var upBox = new Path2D();
  upBox.rect(380, 60, 30, 30);

  var downBox = new Path2D();
  downBox.rect(380, 110, 30, 30);

  var hoverUp = false;
  var hoverDown = false;

  var canvas = document.getElementById('metronome-canvas');

  canvas.onmousemove = function(e) {

    var rect = this.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top,
    i = 0, r;


    while(r = arrowBoxes[i++]) {
      //ctx.beginPath();
      //ctx.rect(r.x, r.y, r.w, r.h);
      //ctx.stroke();

      if( ctx.isPointInPath(upBox, x, y) ) {
        hoverUp = true;
        hoverDown = false;
      } else if( ctx.isPointInPath(downBox, x, y) ) {
        hoverUp = false;
        hoverDown = true;
      } else {
        hoverUp = false;
        hoverDown = false;
      }
    }
  };

  canvas.onclick = function(e) {

    if(hoverUp) {
      //console.log("increase tempo");
      tempo++;
    } else if(hoverDown) {
      //console.log("decrease tempo");
      tempo--;
    } else {
      //do nothing
    }

  };

  return {
    update: function(song) {
      console.log("update metronome with context");
      
      var thickness = 25;

      roundedRect(0, 0, 600, 400, 12, "black");
      roundedRect(thickness, thickness, 550, 350, 12, segmentDisplay.backgroundColor);
      beatValue.setValue(song.getBeat().toString());
      tempoLabel.setValue('tempo');
      tempoValue.setValue(song.getTempo().toString());
      countLabel.setValue('count');
      countValue.setValue(song.getCount().toString());
      sigLabel.setValue('sig');
      sigValue.setValue(song.getTimeSig());
      sectionLabel.setValue('section');
      sectionValue.setValue(song.getSectionName());
      drawUpArrow();
      drawDownArrow();

      //window.requestAnimationFrame(draw);
    }
  };
});
