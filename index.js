var request = require('request');
var cheerio = require('cheerio');

var config = require('./config');
var Ziggy = require('ziggy').Ziggy;

var chip = new Ziggy({
        server: 'irc.freenode.net'
        , nickname: 'chippah'
        , username: 'chippah'
        , realName: 'Chip Chipperson'
        , channels: ['#danecando', '#learnjavascript', '#forum-channel', '#conversely']
    });

chip.start()

chip.on('ready', function() {
    chip.say('nickserv', 'identify ' + config.nick_pass);
});

chip.on('message', function(user, channel, text) {

    var words = text.split(" ");

    // Display page titles
    words.forEach(function(word) {
        if (word.substr(0, 7) === 'http://' || word.substr(0, 8) === 'https://') {
            request(word, function (err, response, page) {
                if (err) {
                    throw err;
                }

                $ = cheerio.load(page);
                chip.say(channel,'Title: ' + $('title').text());
            });
        }
    });

    words.forEach(function (word) {

        switch (word) {

            case config.bot_nick:
                chip.say(channel, 'fawk you caswksucka!');
                break;

            case 'chip':
                chip.say(channel, 'whats that?');
                break;

            case 'chippin':
                chip.say(channel, 'fuckkkk yeahhh!');
                break;
        }

    });
});


//var redis = require('redis');
//var url = require('url');
//var redisURL = url.parse(process.env.REDISCLOUD_URL);
//var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
//client.auth(redisURL.auth.split(":")[1]);

