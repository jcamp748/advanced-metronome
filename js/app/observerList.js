define( function() {
  // do initialization


  return {
    observerList:  [],
    
     
    add: function( obj ){
      return this.observerList.push( obj );
    },
     
    count: function(){
      return this.observerList.length;
    },
     
    get: function( index ){
      if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ];
      }
    },
     
    indexOf: function( obj, startIndex ){
      var i = startIndex;
     
      while( i < this.observerList.length ){
        if( this.observerList[i] === obj ){
          return i;
        }
        i++;
      }
     
      return -1;
    },
     
    removeAt: function( index ){
      this.observerList.splice( index, 1 );
    }
  };

});
