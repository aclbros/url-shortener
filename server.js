var express = require("express");

var app = express();
require("dotenv").load();

app.set('view engine', 'ejs');

app.use('/css', express.static(__dirname + '/views/css'));
app.use(require('./api'));

// start the server
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
