# liri-node-app

Liri is a student project designed to learn how to use Node.js. It is a command line node app that takes in parameters and gives back data. Liri is able to find concert, song, and movie information based on the commands it is given. Anyone interested in exploring how the code works is welcome to clone the repository. One thing you will need to do for yourself is create your own .env file and supply your own Spotify api keys.

Liri recognizes four primary commands: concert-this, spotify-this-song, movie-this, and do-what-it-says.

Below are details of how to use each command and examples of what the output will be.

## _concert-this_

Concert-this searches for a band's next event using the Bands In Town Artist Events API.
On the command line, type: node liri.js concert-this "<artist/band name>"

Here is the result of: concert-this "foo fighters" ![concert1-image](/images/concert-this-1.JPG) 
