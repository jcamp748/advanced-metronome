// metronome is a Singleton
var metronome = (function () {
  // instance stores a reference to the Singleton
  var instance;

  function init() {
    // private methods and variables

    function loadData() {
      console.log("loading data");
    }

    function draw() {
      console.log("drawing");
    }


    return {
      // public methods and variables
      play: function() {
	console.log("playing...");
      },

      pause: function() {
	console.log("paused");
      },

      reset: function() {
	console.log("resetting metronome");
      }


    };

  }

  return {
    // get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function() {

      if ( !instance ) {
	instance = init();
      }

      return instance;
    }
  };
})();

var Metronome = metronome.getInstance();
