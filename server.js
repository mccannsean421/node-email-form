var express = require('express');
var path = require('path');
var index = require('./routes/index');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.use('/', index);

//Static content
app.use(express.static(path.join(__dirname, 'public')))

//posting
app.post('/contact', function (req, res) {
	var smtpTrans;

	//Set up gmail credentials
	var smtpTrans = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: { 
	        user: 'you@gmail.com',  // enter your gmail account
	        pass: 'yourPassword'  // enter your gmail password
	    }
	});

	//Mail body
	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
		to: 'you@gmail.com',
		subject: 'Website contact form',
		text: req.body.message
	};

	//Send mail
	smtpTrans.sendMail(mailOpts, function (error, res) {
	  //Email not sent
	  if (error) {
	      console.log('!!!!!!!!!! Something went wrong: ' + error);
	  }
	  //Email sent
	  else {
	      console.log('Email sent!');
	      res.redirect('/contact');
	  }
	});

	console.log(req.body.name);
})

app.listen(3000, function() {
	console.log('App running on port 3000');
})