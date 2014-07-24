var irc = require('irc');
var config = require('./config');

// bot features
var linkinfo = require('./lib/linkinfo');

//var redis = require('redis');
//var url = require('url');
//var redisURL = url.parse(process.env.REDISCLOUD_URL);
//var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
//client.auth(redisURL.auth.split(":")[1]);

var options = {
    userName: config.bot_nick,
    realName: 'Lyle Chipperson',
    port: 6667,
    debug: true,
    channels: ['#danecando', '#learnjavascript', '#conversely']
}

// create irc connection
var client = new irc.Client(config.server, config.bot_nick, options);


// catch and log any error events
client.addListener('error', function(message) {
    console.log('error: ', message);
});


// setup bot after connection
client.addListener('registered', function(message) {

    // identify bot nick
    client.say('nickserv', 'identify ' + config.nick_pass);

    // check for owner set a variable


});


// listen for ping events to run checks and make updates every couple of minutes
client.addListener('ping', function(server) {

});


// handle message events
client.addListener('message#', function(nick, to, text, message) {


    // parse chat messages
    var words = text.split(" ");
    words.forEach(function(word) {

        // check if message contains a link
        if (word.substr(0, 7) === 'http://' || word.substr(0, 8) === 'https://') {

            linkinfo.pageTitle(word, function(title) {

                // echo web page title
                client.say(to, irc.colors.wrap('light_red', title));
            });
        }

        // add code for trolling
    });

});