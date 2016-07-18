document.addEventListener('form complete', function(event) {
  // create a table element
  //console.log("create table");
  //var table = document.createElement("table");
  //var form = document.getElementById("form-wrapper");
  //form.appendChild(table);
  $("#form-wrapper").children().first().append(
      $('<div></div>').addClass("col-md-8").append(
        $('<table></table>')
          .attr("id", "metro-table")
          .addClass("table table-striped").append(
            $('<thead></thead>').append(
              $('<tr></tr>')
                .append(
                  $('<th></th>').text("time sig").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("tempo").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("measures").addClass("col-xs-3"))
                .append(
                  $('<th></th>').text("name").addClass("col-xs-3"))))));

  // utility function to add elements to table
});
