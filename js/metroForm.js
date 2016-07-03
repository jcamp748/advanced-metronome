document.addEventListener("DOMContentLoaded", function(event) {

  // create a div to contain the form
  var formDiv = document.createElement("div");
  formDiv.setAttribute("id", "form-wrapper");

  // create <form> element, change the action and method
  // attributes to connect submit to the server
  var form = document.createElement("form");
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


  // add the form to the form div
  formDiv.appendChild(form);

  // add the form div to the outer div
  var wrapper = document.getElementById("metronome-wrapper");
  wrapper.appendChild(formDiv);

});
