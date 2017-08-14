//dependent stuff
var express = require('express');
var bodyParser = require('body-parser');


// app inititaliation
var app = express

//PORT
var Port = 3000

//Parsing etc..
app.use(bodyParser.json()));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api.json'}));
app.use(express.static(_dirname + '/app/public'));

//Routing
require('./app/routing/apitRoutes')(app);
require('./app/routing/htmlRoutes.')(app);

//LISTEN!
app.listen(port);
