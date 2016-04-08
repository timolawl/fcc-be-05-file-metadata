'use strict';

function urlHandler (db) {
    var urls = db.collection('urls');
    var urlProjection = { _id: false };
    urls.createIndex({ createdAt: 1 }, { expireAfterSeconds: 15552000 }); // expire links after 180 days.

    function generatePathName (callback) {
        var pathName = String(Math.floor(Math.random() * 1000)); // 4 digit path number

        while (pathName.length < 4) { // left pad the string with zeros to ensure 4 digits.
            pathName = '0' + pathName;
        }

        urls.findOne({ short_url: 'https://timolawl-url-shortener.herokuapp.com/' + pathName }, urlProjection, function (err, result) {
            if (err) throw err;

            if (result) {
                generatePathName(callback); // if the number is already used, generate another and check again.
            }
            else {
                callback(pathName); // if number is not used, return this value.
            }
        });
    }


    this.getURL = function (req, res) {
        var url = req.url.slice(5); // removes the '/new/'

        urls.findOne({ original_url: url }, urlProjection, function (err, result) {
            if (err) throw err;

            if (result) {
                urls.update(result, { $set: { createdAt: new Date() }}); // refresh link if asked for again.
                res.json(result);  // return the link.
            }
            else {
                // generate a path name to use
                generatePathName(function (path) {
                    urls.insert({ original_url: url, short_url: 'https://timolawl-url-shortener.herokuapp.com/' + path, createdAt: new Date() }, function (err) {
                        if (err) throw err;

                        urls.findOne({ original_url: url }, urlProjection, function (err, doc) {
                            if (err) throw err;

                            res.json(doc);
                        });
                    });
                });
             }
        });
    };

    this.redirectURL = function (req, res) {
        var shortUrl = req.url.slice(1); // removes the '/'

        urls.findOne({ short_url: 'https://timolawl-url-shortener.herokuapp.com/' + shortUrl }, urlProjection, function (err, result) {
            if (err) throw err;

            if (result) { // matching entry found. commense redirect
                res.redirect(result.original_url);
            }
            else res.json({ error: 'This URL is not in the database, or has expired (over 180 days since creation).' });
        });
    };
}

module.exports = urlHandler;
