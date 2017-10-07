var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;

var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var liriArgument = process.argv[2];

switch (liriArgument) {
    case "tweets":
        findTweets();
        break;
    case "spotify":
        getSong();
        break;
    case "movie":
        findMovie();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. tweets " + "\r\n" +
            "2. spotify 'any song name' " + "\r\n" +
            "3. movie 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n");
};



//==============   SPOTIFY FUNCTION   =================//
function getSong(songName) {
    var songName = process.argv[3];
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: "026708b47b8d469d87e82ed606cf766a",
        secret: "eef39c318d2349dc90d4f7311f1f591c",
    });

    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
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
function findTweets() {
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
};

//==============   MOVIE FUNCTION   =================//
function findMovie() {
    var request = require('request');
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
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

//==============   DO WHAT IT SAYS FUNCTION   =================//
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (!error) {
            doWhatItSaysResult = data.split(",");
            getSong(doWhatItSaysResult[0], doWhatItSaysResult[1]);
            console.log(doWhatItSaysResult);
        }
    });
};