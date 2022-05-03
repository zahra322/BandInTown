$(document).ready(function () {
    const baseURL = "https://rest.bandsintown.com";
    const appId = "abc";
    $("#btn").on("click keypress", function (event) {

        var artistName = $("#aname").val();
        if (!isEmpty(artistName)) {
            getArtistInformation(artistName);
        }

    });
    $("#aname").on("keypress", function (event) {
        if (event.which == 13) {
            var artistName = $("#aname").val();
            if (!isEmpty(artistName)) {
                getArtistInformation(artistName);
            }

        }

    });

    function isEmpty(artistName) {
        if (artistName == "") {
            alert("Artist Name should not empty");
            return true;
        }
        else
            return false;

    }

    function getArtistInformation(artistName) {
        $.ajax({
            url: baseURL + "/artists/" + artistName + "?app_id=" + appId,
            type: 'GET',
            dataType: 'json',
            success: function (artists) {
                if (!artists.error) {
                    $.ajax({
                        url: baseURL + "/artists/" + artistName + "/events?app_id=" + appId,
                        type: 'GET',
                        dataType: 'json',
                        success: function (events) {
                            displayArtistInformation(events, artists);

                        },
                        error: function (request, message, error) {
                            if (request.status == 404)
                                alert("No Events to Display");
                        }
                    });

                }
                else
                    $("#tbody").html("No Artist to Display");

            },
            error: function (request, message, error) {
                if (request.status == 404)
                    alert("No Artist to Display");
            }
        });
    }

    function displayArtistInformation(events, artists) {
        $("#adetails").show();
        var body = "<tr><td>" + artists.name + "</td>" ;
        //    "<td rowspan='0'><img id = 'aimg' src=" + artists.image_url + "></td></tr>";
        if (artists.links.length != 0) {
            artists.links.forEach((link, index) => {
                if (link.type == 'facebook')
                    body += "<tr><td><a href=" + link.url + ">" + link.url + "</a></td></tr>";
            });
        }

        if (events.length != 0) {
            events.forEach((event, index) => {
                body += "<tr><td><ul><li>Venue: " + event.venue.name + "</li>" +
                    "<li>City: " + event.venue.city + "</li>" +
                    "<li>Country: " + event.venue.country + "</li>" +
                    "<li>Date And Time: " + moment(event.datetime, 'YYYY-MM-DD HH:mm:ss').format("YYYY-MM-DD HH:mm:ss") + "</li>" +
                    "</ul></td></tr>";
            });
        }
        else {
            body += "<tr><td> The artist has no Events</td></tr>";
        }
        $("#tbody").html(body)
        $("#imgdiv").html("<img id = 'aimg' src=" + artists.image_url + ">");

    }

});


