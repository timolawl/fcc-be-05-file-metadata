'use strict';


module.exports = function (app, multer) {

    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route('/file-upload')
        .post(multer({dest: './uploads/'}).single('fileToAnalyze'), function (req, res) {
            res.json({ size: req.file.size });
        });

    app.use(function (req, res) {   // default response for any other path
        res.status(400).send('Bad Request');
    });

};
