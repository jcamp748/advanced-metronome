define(["app/observerList"], function(observerList) {

  function Subject(){
    this.observers = observerList.create();
  }
   
  Subject.prototype.addObserver = function( observer ){
    this.observers.add( observer );
  };
   
  Subject.prototype.removeObserver = function( observer ){
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
  };
   
  Subject.prototype.notify = function( context ){
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
      this.observers.get(i).update( context );
    }
  };

  return {
    create: function() {
      return new Subject();
    }
  };


});
