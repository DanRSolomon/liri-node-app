require("dotenv").config();

var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3];

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
