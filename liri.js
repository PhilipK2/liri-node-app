var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;


var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var prompt = require('prompt');
var inquirer = require('inquirer');

// //takes in the user input that calls the option you want
var input = '';


//options that the user can choose from
var myTweets = 'Tweets';
var songs = 'spotify-this-song';
var movies = 'movie-this';

console.log("\r\n" + "Type one of the following commands" + "\r\n" +
    "1. Tweets " + "\r\n" +
    "2. spotify-this-song 'any song name' " + "\r\n" +
    "3. movie-this 'any movie name' " + "\r\n" +
    "Be sure to put the movie or song name in quotation marks if it's more than one word.");

inquirer.prompt([{
        type: "input",
        name: "decision",
        message: "What will you do?!"
    }


]).then(function(user) {
    input = user.decision;
    if (input === myTweets) {
        getTweets();
    }
    (input === movies)
    getMovie();
});






//==============   TWITTER FUNCTION   =================//
var getTweets = function() {
    var client = new Twitter(twitterKeys);
    console.log('things!!!');

    var params = {
        screen_name: "PhilKappaz",
        count: '20',
    }
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log('err');
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });

                //this creates the variable tdate which will store the result of the date from the twitter call for easier access later
                var tDate = new Date(tweets[tweet].created_at);

                //console.log all of the tweets organizing them by tweet# followed by the date of the tweet and finally the text of the tweet itself
                console.log("Tweet #: " + (parseInt(tweet) + 1) + " ");
                console.log(tDate.toString().slice(0, 24) + " ");
                console.log(tweets[tweet].text);
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
            console.log("This movie was released in: " + JSON.parse(data).Year);
        }
    });
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
}







// my - tweets
// spotify - this - song
// movie - this
// do -what - it - says