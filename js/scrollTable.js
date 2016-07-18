document.addEventListener('form complete', function(event) {
  // create a table element
  //console.log("create table");
  //var table = document.createElement("table");
  //var form = document.getElementById("form-wrapper");
  //form.appendChild(table);
  $("#form-wrapper").append(
      $('<table></table>')
        .attr("id", "metro-table")
        .addClass("table table-striped").append(
          $('<thead></thead>').append(
            $('<tr></tr>').append(
              $('<th></th>').text("time sig").append(
              $('<th></th>').text("tempo")).append(
              $('<th></th>').text("measures")).append(
              $('<th></th>').text("name"))))));

  // utility function to add elements to table
});
