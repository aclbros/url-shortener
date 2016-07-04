var express = require("express");
var router = express.Router();
var request = require("request");
var mongoose = require("mongoose");

require("dotenv").load();

mongoose.connect(process.env.MONGO_URI);

// define url model
var Url = mongoose.model('Url', {original_url: String, short_url: String});

// main page
router.get('/', function(req, res) {
    res.render('index');
});

// use a shortened url
router.get(/\/\d{4}/, function(req, res) {
    Url.findOne({short_url: req.get('Host') + req.path}, function(err, userObj) {
        if (err) {
            res.send({error: "This URL is not on the database."});
        } else {
            res.redirect(userObj.original_url);
        }
    });
});

// request a new short url
router.get(/\/.*/, function(req, res) {
    if (req.path == '/new' || req.path == '/new/') {
        res.send('You must include an URL. Example: /new/http://www.example.com');
    } else {
        var args = req.path;
        if (args.substring(0, 5) != '/new/') {
            res.send("This isn't a valid request. Example: /new/http://www.example.com");
        } else {
            request(args.substring(5), function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var newUrl = new Url({original_url: args.substring(5),
                    short_url: req.get('Host') + "/" + (Math.floor(Math.random() * (9999 - 1000)) + 1000)});
                    console.log(newUrl);
                    newUrl.save(function (err, userObj) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({original_url: newUrl.original_url,
                                         short_url: newUrl.short_url
                            });
                        }
                    });
                } else if (error) {
                    res.send({error: "The URL is not responding."});
                }
            });
        }
    }
});

module.exports = router;