define(["app/observerList"], function(observerList) {

  var observers = Object.create(observerList);

  return {

    observers: observers,
     
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
