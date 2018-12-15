require("dotenv").config();


var fs = require("fs");
var moment = require('moment');
var axios = require("axios");

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");


var action = process.argv[2];
var request = process.argv[3];

function concert(bandName) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            var concertInfo = response.data[0];
            if (concertInfo != undefined) {
                console.log(`\n--------------------`);
                console.log(`Upcoming concert info for: ${concertInfo.lineup[0]}.`);
                console.log(`Next concert venue: ${concertInfo.venue.name}.`);
                console.log(`Location: ${concertInfo.venue.city}, ${concertInfo.venue.region}.`);
                var concertDate = moment(concertInfo.datetime).format('MM/DD/YYYY');
                console.log(`Date: ${concertDate}.`);
                console.log(`--------------------`);

            } else {
                console.log(`\n--------------------`);
                console.log(`I'm sorry, there was no concert information for ${bandName}. Please try a different band/artist.`);
                console.log(`--------------------`);
            };
        }
    );

};

function song(song) {
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {
            var songInfo = response.tracks.items[0]
            if (songInfo != undefined) {
                console.log(`\n--------------------`);
                console.log(`Artist: ${songInfo.artists[0].name}.`);
                console.log(`Song Name: ${songInfo.name}.`);
                if (songInfo.preview_url != undefined) {
                    console.log(`Preview link to song: ${songInfo.preview_url}`);
                } else {
                    console.log("No preview available.")
                };
                console.log(`Album Name: ${songInfo.album.name}.`);
                console.log(`--------------------`);
            } else {
                console.log(`\n--------------------`);
                console.log(`I'm sorry, there was no song information for ${song}. Please try a different song.`)
                console.log(`--------------------`);
            };
        })
        .catch(function (err) {
            console.log(err);
        });
};



function movie(movieTitle) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var movieInfo = response.data;
            if (movieInfo.Title != undefined) {
                console.log(`\n--------------------`);
                console.log(`Title: ${movieInfo.Title}.`);
                console.log(`Release Year: ${movieInfo.Year}.`);
                console.log(`IMDB Rating: ${movieInfo.Ratings[0].Value}.`);
                if (movieInfo.Ratings[1] != undefined) {
                    console.log(`Rotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}.`);
                };
                console.log(`Country: ${movieInfo.Country}.`);
                console.log(`Language: ${movieInfo.Language}.`);
                console.log(`Plot: ${movieInfo.Plot}`);
                console.log(`Actors: ${movieInfo.Actors}.`);
                console.log(`--------------------`);
            } else {
                console.log(`\n--------------------`);
                console.log(`I'm sorry, there was no movie information for ${movieTitle}. Please try a different movie.`);
                console.log(`--------------------`);
            };
        }
    );
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",");
        switch (data[0]) {
            case "concert-this":
                data[1] = data[1].slice(1, -1);
                concert(data[1]);
                break;

            case "spotify-this-song":
                data[1] = data[1].slice(1, -1);
                song(data[1]);
                break;

            case "movie-this":
                data[1] = data[1].slice(1, -1);
                movie(data[1]);
                break;
            default:
                wrongChoice();
        }
    });
};

function wrongChoice() {
    console.log(`\n--------------------`);
    console.log("Please us one of the following commands to use this search:");
    console.log('- concert-this "<artist/band name here>"');
    console.log('- spotify-this-song "<song title here>"');
    console.log('- movie-this "<movie title here>"');
    console.log('- do-what-it-says');
    console.log('\nBe sure to put the artist/song/movie title in quotes.');
    console.log(`--------------------`);
};

switch (action) {
    case "concert-this":
        if (request === undefined) {
            request = "ace of base";
        }
        concert(request);
        break;

    case "spotify-this-song":
        if (request === undefined) {
            request = "All That She Wants";
        }
        song(request);
        break;

    case "movie-this":
        if (request === undefined) {
            request = "Mr. Nobody";
        }
        movie(request);
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
