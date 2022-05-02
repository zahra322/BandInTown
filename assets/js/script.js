$(document).ready(function(){
    const baseURL = "https://rest.bandsintown.com";
    const appId = "abc";
    $("#btn").click(function(){
     
        var artistName = $("#aname").val();
        if (!isEmpty(artistName))
        {
            getArtistInformation(artistName);
        }
  
 
    });

    function isEmpty(artistName)
    {
        if (artistName == "")
        {
            alert("Artist Name should not empty");
            return true;
        }
        else
            return false;
        
    }
    // function isValidLength(artistName)
    // {
    //     if (artistName.length <= 2)
    //     {   
    //         alert("Enter a valid Artist Name");
    //         return false;
    //     }
          
    //     else
    //         return true;
        
    // }


    function getArtistInformation(artistName)
    {
        $.ajax({
         url: baseURL+ "/artists/" + artistName + "?app_id=" +appId,
         type: 'GET',
         dataType: 'json',
         success: function (artists) {
             if (!artists.error)
             {
                $.ajax({
                    url: baseURL+ "/artists/" + artistName + "/events?app_id=" +appId,
                    type: 'GET',
                    dataType: 'json',
                    success: function (events) {
                       displayArtistInformation(events,artists);
                    
                    },
                    error: function (request, message, error) {
                        if(request.status == 404)
                            alert("No Events to Display");
                    }
                });
           
             }
             else 
             $("#tbody").html("No Artist to Display");
        
         },
         error: function (request, message, error) {
             if(request.status == 404)
                alert("No Artist to Display");
         }
           });
    }

  function displayArtistInformation(events,artists) {
    var body =   "<tr><td>" + artists.name + "</td></tr>"+
    "<tr><td><img src=" + artists.image_url + "></td></tr>";  
    if(artists.links.length != 0)
    {
        artists.links.forEach((link, index) => {
            if(link.type == 'facebook')
                body += "<tr><td><a href=" + link.url + ">Facebook URL</a></td></tr>";
        }); 
    }

    if(events.length != 0)
    {
    events.forEach((event, index) => {
        // body += "<tr><table><tbody><tr>"+ event.venue.name +"</tr>"+
        // "<tr>"+  event.venue.city +"</tr>"+
        // "<tr>"+  event.venue.country +"</tr>";

        // "</tbody></table></tr>";
      
        body += "<tr><td>" + event.venue.name + "</td>"+
        "<td>" + event.venue.city + "</td>"+
        "<td>" + event.venue.country +"</td>"+
        "<td>" + event.datetime+ "</td></tr>";
    });
}
else{
    body += "<tr><td> The artist has no Events</td></tr>";
}
    $("#tbody").html(body)
 
}
    
  });


