document.addEventListener("DOMContentLoaded", function(event) {

  // create a div to contain the form
  var formDiv = document.createElement("div");
  formDiv.setAttribute("id", "form-wrapper");

  // create <form> element, change the action and method
  // attributes to connect submit to the server
  var form = document.createElement("form");
  form.setAttribute("id", "metronome-form");
  form.setAttribute("action", "#");
  form.setAttribute("method", "#");

  // time sig fieldset 
  var timeField = document.createElement("fieldset");
  timeField.className = "form-group";
  var timeLabel = document.createElement("label");
  timeLabel.setAttribute("for", "timeSigInput");
  timeLabel.textContent = "Time Signature";
  timeField.appendChild(timeLabel);
  var timeInput = document.createElement("input");
  timeInput.setAttribute("type", "text");
  timeInput.setAttribute("value", "timesig");
  timeInput.setAttribute("id", "timeSigInput");
  timeInput.className = "form-control";
  timeField.appendChild(timeInput);
  form.appendChild(timeField);

  // tempo fieldset
  var tempoField = document.createElement("fieldset");
  tempoField.className = "form-group";
  var tempoLabel = document.createElement("label");
  tempoLabel.setAttribute("for", "tempoSigInput");
  tempoLabel.textContent = "Tempo";
  tempoField.appendChild(tempoLabel);
  var tempoInput = document.createElement("input");
  tempoInput.setAttribute("type", "text");
  tempoInput.setAttribute("value", "tempo");
  tempoInput.setAttribute("id", "tempoSigInput");
  tempoInput.className = "form-control";
  tempoField.appendChild(tempoInput);
  form.appendChild(tempoField);

  // measure count fieldset
  var countField = document.createElement("fieldset");
  countField.className = "form-group";
  var countLabel = document.createElement("label");
  countLabel.setAttribute("for", "countSigInput");
  countLabel.textContent = "Number of measures";
  countField.appendChild(countLabel);
  var countInput = document.createElement("input");
  countInput.setAttribute("type", "text");
  countInput.setAttribute("value", "count");
  countInput.setAttribute("id", "countSigInput");
  countInput.className = "form-control";
  countField.appendChild(countInput);
  form.appendChild(countField);

  // create a add button
  var addButton = document.createElement("button");
  addButton.setAttribute("onclick", "addSection()");
  addButton.innerHTML = "add section";
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

});
