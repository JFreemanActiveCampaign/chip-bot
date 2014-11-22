var irc = require('irc');
var config = require('./config');
var twitter = require('./lib/twitter').twitter;

// bot features
var linkinfo = require('./lib/linkinfo'),
    master = require('./lib/master'),
    mudda = master(config.owner_nick);


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
    channels: ['#learnjavascript']
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

    twitter.get('statuses/user_timeline', { screen_name: 'ChipChipperson', count: 200 }, function(err, data, response) {
        setInterval(function() {
            var random = Math.floor(Math.random() * (data.length - 0) + 0);
            client.say('#learnjavascript', data[random].text);
        }, 60000 * 10)
    });

});


client.addListener('names', function(channel, nicks) {

    // check owner online status
    for (var key in nicks) {
        if (key === config.owner_nick) {
            mudda.setStatus(true);
        }
    }

});

client.addListener('join', function(channel, nick, message) {

    // check if owner joins
    if (nick === config.owner_nick) {
        mudda.setStatus(true);
    }


});

client.addListener('part', function(channel, nick, reason, message) {

    // check if owner leaves
    if (nick === config.owner_nick) {
        mudda.setStatus(false);
    }


});


client.addListener('quit', function(nick, reason, channels, message) {

    // check if owner leaves
    if (nick === config.owner_nick) {
        mudda.setStatus(false);
    }

});


// listen for ping events to run checks and make updates every couple of minutes
client.addListener('ping', function(server) {

    // check on owner every couple of minutes to make sure status is always accurate
    client.whois(config.owner_nick, function(whois) {
        if (!whois.hasOwnProperty('name')) {
            mudda.setStatus(false);
        }
    });

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

//        troll.respond(word.toLowerCase(), function(response) {
//
//            client.say(to, response);
//        });

        // add code for trolling
    });

});