'use strict';


module.exports = function (app) {

    var fs = require('fs');
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './')
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname + '-' + Date.now())
        }
    });

    var upload = multer({ storage: storage });


    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route('/file-upload')
        .post(upload.single('fileToAnalyze'), function (req, res) {
            res.json({ size: req.file.size });
            fs.unlink('./' + req.file.path);
        });

    app.use(function (req, res) {   // default response for any other path
        res.status(400).send('Bad Request');
    });

};
