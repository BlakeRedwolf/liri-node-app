var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");
var expression = process.argv[2];
var value = process.argv.slice(3);
var nodeArgs = process.argv;
var movie = " ";

switch (expression) {
	case "-my-tweets":
		getTweets();
		break;
	case "-spotify-this-song":
		getSpotify();
		break;
	case "-movie-this":
		getMovie();
		break;
	case "-do-what-it-says":
		getRandomTxt();
		break;
	default:
		// do nothing
		break;
}

function getTweets() {
		var client = new twitter(keys.twitterKeys);
		var params = {THEREALWTD: "nodejs", count: "20"};
		client.get("statuses/user_timeline", params, function(err, tweets, response) {
			if (!err) {
				for(i in tweets) {
					console.log(tweets[i].text + "Tweet: " + i);
				}

			}	
		});
};

	function getSpotify() {
		spotify.search({type: "track", query: value}, function(err, data) {
			if (err) {
				console.log(err);
			}
			else {
				console.log("Album Name: " + data.tracks.items[0].album.name + "Artist: " + data.tracks.items[0].artists[0].name + "Preview URL: " + data.tracks.items[0].preview_url + "Track Name: " + data.tracks.items[0].name);
			var musicArray = ["Album Name: " + data.tracks.items[0].album.name + "\n", "Artist: " + data.tracks.items[0].artists[0].name + "\n", "Preview URL: " + data.tracks.items[0].preview_url + "\n", "Track Name: " + data.tracks.items[0].name + "\n"];
			}
		fs.appendFile("log.txt", musicArray.join(""), function(err){
			if (err) {
				console.log(err);
			}
		});
		});
	};

	function getMovie() {
		var nodeArgs = process.argv;
		for (i = 3; i < nodeArgs.length; i++) {
			if (i > 3 && i < nodeArgs.length) {
				movie += "+" + nodeArgs[i];
			}
			else {
				movie += nodeArgs[i];
			}
		}
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function(err, response, body) {
		if (!err && response.statusCode === 200) {
			var movieOb = JSON.parse(body);
			console.log("Movie Title: " + movieOb.Title + "Release Year: " + movieOb.Year + "imdb Rating: " + movieOb.imdbRating + "Country: " + movieOb.Country + "Plot: " + movieOb.Plot + "Actors: " + movieOb.Actors + "Rotten Tomato Rating: " + movieOb.Ratings[1]);
		var movieArray = ["Movie Title: " + movieOb.Title + "\n", "Release Year: " + movieOb.Year + "\n", "imdb Rating: " + movieOb.imdbRating + "\n", "Country: " + movieOb.Country + "\n", "Plot: " + movieOb.Plot + "\n", "Actors: " + movieOb.Actors + "\n", "Rotten Tomato Rating: " + movieOb.Ratings[1] + "\n"]
		}
		fs.appendFile("log.txt", movieArray.join(""), function(err) {
			if (err) {
				console.log(err);
			}
		});
	});
	};

	function getRandomTxt() {
		fs.readFile("random.txt", "utf8", function(err, data) {
			var dataSplit = data.split(",");
			var dataA = dataSplit[0];
			var search = dataSplit[1];
			if (dataA === "-spotify-this-song") {
				spotify.search({type: "track", query: search}, function(err,data) {
					if (err) {
						console.log(err);
					}
					else {
						console.log("Album Name: " + data.tracks.items[0].album.name + "Artist: " + data.tracks.items[0].artists[0].name + "Preview URL: " + data.tracks.items[0].preview_url + "Track Name: " + data.tracks.items[0].name);
						var musicArrayB = ["Album Name: " + data.tracks.items[0].album.name + "\n", "Artist: " + data.tracks.items[0].artists[0].name + "\n", "Preview URL: " + data.tracks.items[0].preview_url + "\n", "Track Name: " + data.tracks.items[0].name + "\n"];
					}
				fs.appendFile("log.txt", musicArrayB.join(""), function(err) {
					if (err) {
						console.log(err);
					}
				});
				});
			};
		});
	 }