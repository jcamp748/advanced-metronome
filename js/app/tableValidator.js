define(function() {

  // private helper functions

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
    var validCount = /^[0-9]+$/;
    if( isNaN(number) || number === 0 || number > 9999) {
      return false;
    } else {
      var valid = validCount.test(userInput);
      return valid;
    }
  }

  function checkTempo( userInput ) {
    // verify 1 <= tempo <= 400
    var number = parseInt(userInput);
    var validNum = /^[0-9]+$/;
    if( isNaN(number) || number === 0 || number > 400) {
      return false;
    } else {
      var valid = validNum.test(userInput);
      return valid;
    }
  }

  function checkTimeSig( userInput ) {
    // verify time sig is of the form N/M where 
    // 1 <= N <= 9 and M == 2 || 4 || 8
    var validSig = /^[1-9]\/[248]$/;
    var valid = validSig.test(userInput);
    //console.log(valid);
    return valid;
  }

  // end of private functions

  // public api
  // the api consists of just the validateTable() function
  return {
    validateTable: function(){

      var text = "";
      var validForm = true;
      var sectionData = {};
      
      // remove all error divs
      $("#metronome-form .form-group .help-block").text("");
      text = $("#timeInput").val();
      if( checkTimeSig(text) ) {
        sectionData["timesig"] = text;
        $("#timeInput").parent().removeClass("has-error");
      } else {
        sectionData = {};
        $("#timeInput").parent().addClass("has-error");
        $("#timeInput").next().text("invalid time signature");
        validForm = false;
      }

      text = $("#tempoInput").val();
      if( checkTempo(text) ) {
        sectionData["tempo"] = text;
        $("#tempoInput").parent().removeClass("has-error");
      } else {
        sectionData = {};
        $("#tempoInput").parent().addClass("has-error");
        $("#tempoInput").next().text("tempo must be between 1 and 400");
        validForm = false;
      }

      text = $("#countInput").val();
      if( checkCount(text) ) {
        sectionData["count"] = text;
        $("countInput").parent().removeClass("has-error");
      } else {
        sectionData = {};
        $("countInput").parent().addClass("has-error");
        $("countInput").next().text("enter a number between 1 and 9999");
        validForm = false;
      }

      text = $("#sectionInput").val();
      if( checkSection(text) ) {
        sectionData["section"] = text;
        $("sectionInput").parent().removeClass("has-error");
      } else {
        sectionData = {};
        $("sectionInput").parent().addClass("has-error");
        $("sectionInput").next().text("section must have a name");
        validForm = false;
      }
      if( validForm ) {
        updateRow(sectionData);
      }
      return validForm;
    }
  };

});
