var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//plain bodyParser() is deprecated. Required to parse json from the request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//register the todo api
require('./api.js')(app);

var port = 3763;

app.listen(port, function() {
  console.log('listening on port ', port);
});
