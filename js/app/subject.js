define(["app/observerList"], function(observerList) {


  return {

    observers: Object.create(observerList),
     
    addObserver: function( observer ){
      observers.add( observer );
    },
     
    removeObserver: function( observer ){
      observers.removeAt( this.observers.indexOf( observer, 0 ) );
    },
     
    notify: function( context ){
      var observerCount = this.observers.count();
      for(var i=0; i < observerCount; i++){
        observers.get(i).update( context );
      }
    },
  };


});
