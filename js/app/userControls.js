// this module is the api for editing the global
// metronome data structure that the application 
// logic is based on
define(function(){
  // do initialization work here

  // return the api
  // the global object is an array of Section objects
  return {

    unshift: function(section) {
      // add section to front of data array
    },

    push: function(section) {
      // add section to end of array
    },

    insert: function(section, index) {
      // put section at INDEX and move the rest of the
      // sections up 1 place
    },

    remove: function(index) {
      // delete section at INDEX
    },

    create: function() {
      // initialize a section and return it
    }
  };

});




      



