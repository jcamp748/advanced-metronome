function validate() {
  var text = "";
  var validForm = true;
  var sectionData = {};
  
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
    updateRow(sectionData);
  }
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
