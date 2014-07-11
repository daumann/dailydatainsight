
/**
 * Module dependencies.
 */
 
require( './db' ); //for mongoose. Require this first!!!

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer");
var app = express();




app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
    
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', routes.page_about);
app.get('/create', routes.page_create);

app.get('/:id', routes.insight);

app.post( '/create/:id', routes.create );

app.post( '/ratingChanged/:id/:type', routes.rate );

// app.post( '/vote/:id/:type', routes.vote );

app.get('/getMeta/:id', routes.getMeta );

// GET

app.get('/feedback', function(req, res) {
    res.render('feedback.jade',{ message: '', errors: {} });
});

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "dietmar.aumann@gmail.com",
        pass: "afcafcafc1"
    }
});
// POST
app.post('/sendEmail/:sender/:content', function (req, res) {
    console.log("Trying to sent email from " + req.params.sender + ", with message: " + req.params.content);
    smtpTransport.sendMail({
        from: req.params.sender,
        to: "Dietmar Aumann <dietmar.aumann@gmail.com>", // comma separated list of receivers
        subject: "Inquiry ✔", // Subject line
        text:  req.params.content
    }, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });


});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
