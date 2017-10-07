var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;


var request = require('request');
var Twitter = require('twitter');
/*var Spotify = require('node-spotify-api');*/

/*var prompt = require('prompt');*/
var inquirer = require('inquirer');

// //takes in the user input that calls the option you want
var input = '';


//options that the user can choose from
var myTweets = 'Tweets';
var songs = 'spotify';
var movies = 'movie';

console.log("\r\n" + "Type one of the following commands" + "\r\n" +
    "1. Tweets " + "\r\n" +
    "2. spotify " + "\r\n" +
    "3. movie " + "\r\n");

inquirer.prompt([{
        type: "input",
        name: "decision",
        message: "What will you do?!"
    }


]).then(function(user) {
    input = user.decision;
    if (input === myTweets) {
        getTweets();
    } else if (input === movies) {

        getMovie();
    } else if (input === songs) {

        getSong();
    }
});



//==============   SPOTIFY FUNCTION   =================//
var getSong = function() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "026708b47b8d469d87e82ed606cf766a",
        secret: "eef39c318d2349dc90d4f7311f1f591c",
    });

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("*************************************************")
            // console.log("DATA: " + data.tracks.items[1]);
        console.log("Artist: " + data.tracks.items[1].artists[0].name);
        console.log("Song Name: " + data.tracks.items[1].name);
        console.log("Album: " + data.tracks.items[1].album.name);
        console.log("Link: " + data.tracks.items[1].href);
        console.log("*************************************************")
    });
}



//==============   TWITTER FUNCTION   =================//
var getTweets = function() {
    /*var client = new Twitter(twitterKeys);*/
    var client = new Twitter(keys);

    var params = {
        screen_name: "PhilKappaz",
        count: '20',
    }
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                var tDate = new Date(tweets[i].created_at);
                console.log("Tweet #: " + (i + 1) + " ");
                console.log(tDate.toString().slice(0, 24) + " ");
                console.log(tweets[i].text);
                console.log("\n");

            }

        }
    })
}

//==============   MOVIE FUNCTION   =================//
var getMovie = function() {
    var request = require('request');
    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = "fargo";

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(e, resp, data) {
        if (!e && resp.statusCode === 200) {

            console.log("*************************************************")
            console.log("Title: " + JSON.parse(data).Title);
            console.log("Year: " + JSON.parse(data).Year);
            console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(data).tomatoRating);
            console.log("Country: " + JSON.parse(data).Country);
            console.log("Language: " + JSON.parse(data).Language);
            console.log("Plot: " + JSON.parse(data).Plot);
            console.log("Actors: " + JSON.parse(data).Actors);
            console.log("*************************************************")
        }
    });
}