const $results = $("#results");

/* Update lat & long range outputs */
$("input[type='range']").on("input", event => {
  console.log("Why isnt this working");
  $(event.currentTarget).next("span")
    .html($(event.currentTarget).val());
});


/* FIND STREET HANDLER */
$("#streetBtn").on("click", () => {
  if ($("#street-term").val() !== "") {
    $.ajax({
      url: "php/getStreetInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        term: $("#street-term").val()
      },
      success: function(result) {
        if (result.status.name === "ok" && result.data !== null) {
          const resultsLen = result.data.length;
          const randInt = Math.floor(Math.random() * resultsLen);
          const currentStreet = result.data[randInt];
            
          const streetName = currentStreet.street;
          const region = currentStreet.adminName1;
          const country = currentStreet.countryCode;
          const output = `${streetName} street, ${region}, ${country}.`;

          $results.html(output);
        }
        else {
          $results.html("No results found!");
        }
      },
      error: function(jqXHR, textStatus, err) {
        console.log(`An error occured: ${textStatus}`);
        console.log(err);
        $results.html("Whoops, an error occured!");
      }
    });

  } else {
    $results.html("You should input a value that isn't nothing!");
  }
});

/* FIND OCEAN HANDLER */
$("#oceanBtn").on("click", () => {
  $.ajax({
    url: "php/getOceanName.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: $("#latitude").val(),
      long: $("#longitude").val()
    },

    success: function(result) {
      const lat = $("#latitude").val();
      const long = $("#longitude").val();
      if (result.status.name === "ok" && result.data["status"] === undefined) {
        const ocean = result.data.ocean.name;
        const output = `Lat: ${lat}&deg;&nbsp;&nbsp;Long: ${long}&deg;&nbsp;&nbsp;-&nbsp;&nbsp;${ocean}`;
        $results.html(output);
      } else {
        $results.html(`No Ocean found at Latitude ${lat}&deg; and Longitude ${long}&deg;.`);
      }
    },
    
    error: function(jqXHR, textStatus, err) {
      console.log(`An error occured: ${textStatus}`);
      console.log(err);
      $results.html("Whoops, an error occured!");
    }
  });
});

/* FIND WIKI ENTRY HANDLER */
$("#wikiBtn").on("click", () => {
  $.ajax({
    url: "php/getWikiSummary.php",
    type: "POST",
    dataType: "json",
    data: {
      location: $("#wiki-term").val()
    },

    success: function(result) {
      if (result.status.name === "ok" && result.data.length !== 0) {
        const data = result.data[0];
        const title = `<strong>${data.title}</strong>`;
        const furtherReading = `Continue reading about <a href="https://${data.wikipediaUrl}" target="_blank">${data.title}.</a>`;

        $results.html(`${title}<br>${data.summary}<br>${furtherReading}`);
      } else {
        $results.html("No results found!");
      }
    },

    error: function(jqXHR, textStatus, err) {
      console.log(`An error occured: ${textStatus}`);
      console.log(err);
      $results.html("Whoops, an error occured!");
    }
  });
});