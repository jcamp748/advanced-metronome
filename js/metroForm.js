document.addEventListener("metronome loaded", function(event) {

  // create a div to contain the form
  var formDiv = $('<div></div>')
    .attr("id", "form-wrapper")
    .attr("style", "display:none")
    .addClass("container");
  
  //create div for row
  var row = $('<div></div>').addClass("row");

  //create div column
  var column = $('<div></div>').addClass("col-md-4");

  // create <form> element, change the action and method
  // attributes to connect submit to the server
  var form = $('<form></form>')
    .attr("id", "metronome-form")
    .attr("role", "form")
    .attr("data-toggle", "validator")
    .attr("action", "#")
    .attr("method", "#");

  // time sig fieldset 
  var timeField = $('<div></div>').addClass("form-group");
  var timeLabel = $('<label></label>')
    .attr("for", "timeInput")
    .addClass("control-label")
    .text("Time Signature");
  timeField.append(timeLabel);
  var timeInput = $('<input></input>')
    .attr("type", "text")
    .attr("id", "timeInput")
    .attr("value", "4/4")
    .addClass("form-control");
  timeField.append(timeInput);
  var timeHelp = helpBlock();
  timeField.append(timeHelp);
  form.append(timeField);

  // tempo fieldset
  var tempoField = $('<div></div>')
    .addClass("form-group");
  var tempoLabel = $('<label></label>')
    .attr("for", "tempoInput")
    .addClass("control-label")
    .text("Tempo");
  tempoField.append(tempoLabel);
  var tempoInput = $('<input></input>')
    .attr("type", "text")
    .attr("id", "tempoInput")
    .attr("value", "100")
    .addClass("form-control");
  tempoField.append(tempoInput);
  var tempoHelp = helpBlock();
  tempoField.append(tempoHelp);
  form.append(tempoField);

  // measure count fieldset
  var countField = $('<div></div>')
    .addClass("form-group");
  var countLabel = $('<label></label>')
    .attr("for", "countInput")
    .addClass("control-label")
    .text("Number of measures");
  countField.append(countLabel);
  var countInput = $('<input></input>')
    .attr("type", "text")
    .attr("id", "countInput")
    .attr("value", "100")
    .addClass("form-control");
  countField.append(countInput);
  var countHelp = helpBlock();
  countField.append(countHelp);
  form.append(countField);

  // section name fieldset
  var sectionField = $('<div></div>')
    .addClass("form-group");
  var sectionLabel = $('<label></label>')
    .attr("for", "sectionInput")
    .addClass("control-label")
    .text("section name");
  sectionField.append(sectionLabel);
  var sectionInput = $('<input></input>')
    .attr("type", "text")
    .attr("id", "sectionInput")
    .attr("value", "Riff a")
    .addClass("form-control");
  sectionField.append(sectionInput);
  var nameHelp = helpBlock();
  sectionField.append(nameHelp);
  form.append(sectionField);


  // create a add button
  var addButton = $('<input></input>')
    .attr("type", "button")
    .attr("value", "add section")
    .attr("onclick", "validate()");
  form.append(addButton);

  // create a clear button
  var clearButton = $('<input></input>')
    .attr("type", "button")
    .attr("value", "clear table")
    .attr("onclick", "clearTable()");
  form.append(clearButton);
    
  // create a submit button
  var submitButton = $('<button></button>')
    .attr("form", "metronome-form")
    .attr("formaction", "#")
    .attr("formmethod", "#")
    .text("save");
  form.append(submitButton);

  // add the form to the column
  column.append(form);

  // add the column to the row
  row.append(column);

  // add the row to the form div
  formDiv.append(row);

  // add the form div to the outer div
  $('#metronome-wrapper').append(formDiv);

  var ev = new Event('form complete');
  document.dispatchEvent(ev);

  function helpBlock() {
    var helpDiv = $('<div></div>').addClass("help-block with-errors");
    return helpDiv;
  }

});

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
