document.addEventListener("DOMContentLoaded", function(event) {

  // create a div to contain the form
  var formDiv = document.createElement("div");
  formDiv.setAttribute("id", "form-wrapper");

  // create <form> element, change the action and method
  // attributes to connect submit to the server
  var form = document.createElement("form");
  form.setAttribute("id", "metronome-form");
  form.setAttribute("role", "form");
  form.setAttribute("data-toggle", "validator");
  form.setAttribute("action", "#");
  form.setAttribute("method", "#");

  // time sig fieldset 
  var timeField = document.createElement("div");
  timeField.className = "form-group";
  var timeLabel = document.createElement("label");
  timeLabel.setAttribute("for", "timeInput");
  timeLabel.className = "control-label";
  timeLabel.textContent = "Time Signature";
  timeField.appendChild(timeLabel);
  var timeInput = document.createElement("input");
  timeInput.setAttribute("type", "text");
  timeInput.setAttribute("id", "timeInput");
  timeInput.setAttribute("value", "4/4");
  timeInput.className = "form-control";
  //timeInput.required = true;
  timeField.appendChild(timeInput);
  var timeHelp = helpBlock();
  timeField.appendChild(timeHelp);
  form.appendChild(timeField);

  // tempo fieldset
  var tempoField = document.createElement("div");
  tempoField.className = "form-group";
  var tempoLabel = document.createElement("label");
  tempoLabel.setAttribute("for", "tempoInput");
  tempoLabel.className = "control-label";
  tempoLabel.textContent = "Tempo";
  tempoField.appendChild(tempoLabel);
  var tempoInput = document.createElement("input");
  tempoInput.setAttribute("type", "text");
  tempoInput.setAttribute("id", "tempoInput");
  tempoInput.setAttribute("value", "100");
  tempoInput.className = "form-control";
  //tempoInput.required = true;
  tempoField.appendChild(tempoInput);
  var tempoHelp = helpBlock();
  tempoField.appendChild(tempoHelp);
  form.appendChild(tempoField);

  // measure count fieldset
  var countField = document.createElement("div");
  countField.className = "form-group";
  var countLabel = document.createElement("label");
  countLabel.setAttribute("for", "countInput");
  countLabel.className = "control-label";
  countLabel.textContent = "Number of measures";
  countField.appendChild(countLabel);
  var countInput = document.createElement("input");
  countInput.setAttribute("type", "text");
  countInput.setAttribute("id", "countInput");
  countInput.setAttribute("value", "100");
  countInput.className = "form-control";
  //countInput.required = true;
  countField.appendChild(countInput);
  var countHelp = helpBlock();
  countField.appendChild(countHelp);
  form.appendChild(countField);

  // section name fieldset
  var sectionField = document.createElement("div");
  sectionField.className = "form-group";
  var sectionLabel = document.createElement("label");
  sectionLabel.setAttribute("for", "sectionInput");
  sectionLabel.className = "control-label";
  sectionLabel.textContent = "section name";
  sectionField.appendChild(sectionLabel);
  var sectionInput = document.createElement("input");
  sectionInput.setAttribute("type", "text");
  sectionInput.setAttribute("id", "sectionInput");
  sectionInput.setAttribute("value", "Riff a");
  sectionInput.className = "form-control";
  //sectionInput.required = true;
  sectionField.appendChild(sectionInput);
  var nameHelp = helpBlock();
  sectionField.appendChild(nameHelp);
  form.appendChild(sectionField);

  // create a add button
  var addButton = document.createElement("input");
  addButton.setAttribute("type", "button");
  addButton.setAttribute("value", "add section");
  addButton.setAttribute("onclick", "addSection()");
  form.appendChild(addButton);
  
  // create a submit button
  // change formaction and formmethod to save changes to server
  var submitButton = document.createElement("button");
  submitButton.setAttribute("form", "metronome-form");
  submitButton.setAttribute("formaction", "#");
  submitButton.setAttribute("formmethod", "#");
  submitButton.innerHTML = "save";
  form.appendChild(submitButton);


  // add the form to the form div
  formDiv.appendChild(form);

  // add the form div to the outer div
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(formDiv);

  function helpBlock() {
    var helpDiv = document.createElement("div");
    helpDiv.className = "help-block with-errors";
    return helpDiv;
  }

});
