var express = require('express');
var path = require('path');
var index = require('./routes/index');

var app = express();

//Routing
app.use('/', index);


//Static content
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, function() {
	console.log('App running on port 3000');
})