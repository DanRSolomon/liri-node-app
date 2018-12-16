# liri-node-app

Liri is a student project designed to learn how to use Node.js. It is a command line node app that takes in parameters and gives back data. Liri is able to find concert, song, and movie information based on the commands it is given. Anyone interested in exploring how the code works is welcome to clone the repository. One thing you will need to do for yourself is create your own .env file and supply your own Spotify api keys.

Liri recognizes four primary commands: concert-this, spotify-this-song, movie-this, and do-what-it-says.

Below are details of how to use each command and examples of what the output will be.

## _concert-this_

Concert-this searches for a band's next event using the Bands In Town Artist Events API.
The command line code is: _node liri.js concert-this "(artist/band name)"_
The information returned is: the concert venue, the location, and the date.

Here is the result of: __concert-this "foo fighters"__

![concert1-image](/images/concert-this-1.JPG) 

## _spotify-this-song_

Spotify-this-song searches a song title using the Spotify API. 
The command line code is: _node liri.js spotify-this-song "(song title)"_
The information returned is: the artist, the song name, a link to here a preview of the song, and the album the song is from.

Here is the result of: __spotify-this-song "learn to fly"__

![spotify1-image](/images/spotify-this-song-1.JPG) 

## _movie-this_

Movie-this searches the title of a movie using the OMDB API.
The command line code is: _node liri.js movie-this "(movie title)"_
The information returned is: the movie title, year released, IMDB rating, Rotten Tomatoes rating, the country it was produced, the movie's language, the plot, and the actors.

Here is the result of: __movie-this "enter the dragon"__

![movie1-image](/images/movie-this-1.JPG) 

## _do-what-it-says_

Do-what-it-says is an exercise in getting the command from a file instead of the user directly. The file random.txt can contain any of the other three commands listed above and the app will run that command.

Here is the result when random.txt contains the line: __spotify-this-song,"freak on a leash"__

![what-it-says1-image](/images/do-what-it-says-1.JPG) 

## _Defaults_

There are defaults in place if the wrong commands are entered or if the search term does not produce any results. Here are a few examples:

![default1-image](/images/default1.JPG) 

![concert3-image](/images/concert-this-3.JPG) 

![concert2-image](/images/concert-this-2.JPG) 

![spotify2-image](/images/spotify-this-song-2.JPG) 

![spotify3-image](/images/spotify-this-song-3.JPG) 

![movie2-image](/images/movie-this-2.JPG) 

![movie3-image](/images/movie-this-3.JPG) 

## _Log_

All searches are recorded in a log.txt file.

![log-image](/images/log-image.JPG) 
