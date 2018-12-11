require("dotenv").config();

var fs = require("fs");
var moment = require('moment');

var action = process.argv[2];
var value = process.argv[3];

function concert() {

    var axios = require("axios");
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            var concertInfo = response.data[0];
            if (concertInfo != undefined) {
                console.log(`\nUpcoming concert info for: ${value}.`);
                console.log(`Next concert venue: ${concertInfo.venue.name}.`);
                console.log(`Location: ${concertInfo.venue.city}, ${concertInfo.venue.region}.`);
                var concertDate = moment(concertInfo.datetime).format('MM/DD/YYYY');
                console.log(`Date: ${concertDate}.`);
            } else {
                console.log(`I'm sorry, there was no concert information for ${value}.`)
            }
        }
    );

}

switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        wrongChoice();
}



// fs.readFile("keys.js", "utf8", function(error, keys) {

//     // If the code experiences any errors it will log the error to the console.
//     if (error) {
//       return console.log(error);
//     }

//     // We will then print the contents of data
//     console.log(keys);

//     // Then split it by commas (to make it more readable)
//     var keysArr = keys.split(",");

//     // We will then re-display the content as an array for later use.
//     console.log(keysArr);

//     // var spotify = new Spotify(keys.spotify);
//     // console.log(spotify);

//   });
