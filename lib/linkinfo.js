var request = require('request');
var cheerio = require('cheerio');

exports.pageTitle = function(url, callback) {

    request(url, function (err, res, page) {

        if (err || res === undefined) {
            return;
        }

        if (res.statusCode == 200) {

            $ = cheerio.load(page);

            var pageTitle = $('title').text();

            if (pageTitle.split(' ').length > 2) {
                callback(pageTitle);
            }
        }
    });

};