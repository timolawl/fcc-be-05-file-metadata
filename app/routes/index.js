'use strict';

var URLHandler = require(process.cwd() + '/app/controllers/urlHandler.server.js');

module.exports = function(app, db) {

    var urlHandler = new URLHandler(db);

    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route(/^\/new\/https?:\/\/[a-zA-Z.-]+/) // response for normal link
        .get(urlHandler.getURL); // if it already exists in the db, then provide the already-generated shortened link.

    app.route(/^\/\d{4}$/)  // response for an app-shortened link
        .get(urlHandler.redirectURL);

    app.use(function (req, res) {   // default response for any other path
        res.json({ "error": "Wrong url format. Please make sure you have a valid protocol and a real site." });
    });

};
