require("dotenv").config();


var fs = require("fs");
var moment = require('moment');
var axios = require("axios");

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");


var action = process.argv[2];
var request = process.argv[3];

function concert(bandName, callback) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            var concertInfo = response.data[0];
            if (concertInfo != undefined) {
                var concertDate = moment(concertInfo.datetime).format('MM/DD/YYYY');
                var bandData = [
                    (`Upcoming concert info for: ${concertInfo.lineup[0]}.`),
                    (`Next concert venue: ${concertInfo.venue.name}.`),
                    (`Location: ${concertInfo.venue.city}, ${concertInfo.venue.region}.`),
                    (`Date: ${concertDate}.`)
                ].join("\n");

            } else {
                var bandData = [
                    (`I'm sorry, there was no concert information for ${bandName}. Please try a different band/artist.`),
                ].join("\n");
            };

            if (typeof callback === "function") {
                callback(bandData);
            }
        }
    );

};

function song(song, callback) {
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {
            var songInfo = response.tracks.items[0]
            if (songInfo != undefined) {
                if (songInfo.preview_url != undefined) {
                    var songLink = songInfo.preview_url;
                } else {
                    var songLink = "No preview available.";
                };
                var songData = [
                    (`Artist: ${songInfo.artists[0].name}.`),
                    (`Song Name: ${songInfo.name}.`),
                    (`Preview link to song: ${songLink}`),
                    (`Album Name: ${songInfo.album.name}.`)
                ].join("\n");
                
            } else {
                var songData = [
                    (`I'm sorry, there was no song information for ${song}. Please try a different song.`)
                ].join("\n");
            };
            if (typeof callback === "function") {
                callback(songData);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};

function movie(movieTitle, callback) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var movieInfo = response.data;
            if (movieInfo.Title != undefined) {
                if (movieInfo.Ratings[1] != undefined) {
                    var rottenTomRating = movieInfo.Ratings[1].Value
                } else {
                    var rottenTomRating = "No rating available.";
                }
                var movieData = [
                    (`Title: ${movieInfo.Title}.`),
                    (`Release Year: ${movieInfo.Year}.`),
                    (`IMDB Rating: ${movieInfo.Ratings[0].Value}.`),
                    (`Rotten Tomatoes Rating: ${rottenTomRating}.`),
                    (`Country: ${movieInfo.Country}.`),
                    (`Language: ${movieInfo.Language}.`),
                    (`Plot: ${movieInfo.Plot}`),
                    (`Actors: ${movieInfo.Actors}.`)
                ].join("\n");
            } else {
                var movieData = [
                    (`I'm sorry, there was no movie information for ${movieTitle}. Please try a different movie.`)
                ].join("\n");
            };
            if (typeof callback === "function") {
                callback(movieData);
            }
        }
    );
};

function doWhatItSays(afterSearch) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",");
        switch (data[0]) {
            case "concert-this":
                data[1] = data[1].slice(1, -1);
                concert(data[1], afterSearch);
                break;

            case "spotify-this-song":
                data[1] = data[1].slice(1, -1);
                song(data[1], afterSearch);
                break;

            case "movie-this":
                data[1] = data[1].slice(1, -1);
                movie(data[1], afterSearch);
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

var divider = "\n\n------------------------------------------------------------\n\n";
function afterSearch(data) {
    fs.appendFile("log.txt", data + divider, function (err) {
        if (err) throw err;
        console.log(divider + data + divider);
    });
};

switch (action) {
    case "concert-this":
        if (request === undefined) {
            request = "ace of base";
        }
        concert(request, afterSearch);
        break;

    case "spotify-this-song":
        if (request === undefined) {
            request = "All That She Wants";
        }
        song(request, afterSearch);
        break;

    case "movie-this":
        if (request === undefined) {
            request = "Mr. Nobody";
        }
        movie(request, afterSearch);
        break;

    case "do-what-it-says":
        doWhatItSays(afterSearch);
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
