'use strict';
var express = require('express')
  , load = require('express-load')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , error = require('./middleware/error')
  , csurf = require('csurf')
  , app = express()
  , cookie = cookieParser("Ntalk");

app.disable('x-powered-by');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(expressSession({
  secret: "Ntalk", 
  name: "ntalk.sid", 
  resave: false, 
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(csurf());
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

load('models').then('controllers')
    .then('routes')
    .into(app);

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function() {
    console.log("Nalk no ar.");
});
