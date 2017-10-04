var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;


var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var prompt = require('prompt');

// //takes in the user input that calls the option you want
var input = '';


//options that the user can choose from
var myTweets = 'tweets';
var songs = 'spotify-this-song';
var movies = 'movie';

prompt.message = "type one of the following: tweets, spotify-this-song, movie,";
prompt.start();
prompt.get({
        properties: {
            userInput: {
                description: ('\nWhat do you choose?')
            }
        }
    },
    pick = function(err, result) {
        input = result.input;
        if (input === myTweets) {
            getTweets();
        }
    });






//==============   TWITTER FUNCTION   =================//
var getTweets = function() {
    var client = new Twitter(twitterKeys);

    var params = {
        screen_name: 'PotatoHound',
        count: '20',
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) throw error; {
            var tweetData = []; //EMPTY ARRAY TO HOLD TWEETS
            for (var i = 0; i < tweets.length; i++) {
                tweetData.push({

                    'Tweets: ': tweets[i].text
                });

            }
            console.log(tweetData);
        }

    });

}







// my - tweets
// spotify - this - song
// movie - this
// do -what - it - says