var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var app = express();
var Promise = require('bluebird');
var query = require('./queries.js');
var mid = require('./middleware.js');
var session = require('express-session');
var http = require('http');
var menu = require('./findmenu.js');
var test = require('./yelp.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/..'));
app.use(function(req, _, next) {
  // console.log('Received a ' + req.method + ' for: ' + req.path);
  next();
});

app.use(session({
  secret: "test",
  resave: false,
  saveUninitialized: true
}));

var acceptRouter = express.Router();
acceptRouter.post('/', query.approveSuggestions, function (req, res) {
  res.send('Accepted suggestions')
})

var rejectRouter= express.Router();
rejectRouter.post('/', query.deleteSuggestions, function (req, res) {
  res.send('Deleted suggestions');
})

var approveRouter = express.Router();

approveRouter.post('/', query.getSuggestions, function(req, res) {
  //console.log('res SUGG ' + res.sugg[0]['name'])
  res.send(res.sugg);
})

var submissionRouter = express.Router();

submissionRouter.post('/', test.callYelpApi, function(req, res) {
  // console.log('res.data is: ' + res.data.displayBars);
  res.send(res.data);
})

var adminRouter = express.Router();

adminRouter.post('/', query.postToDB, function(req, res) {
  res.send('posted suggestion to database!');
  // res.send({status:201, message: })
})


var homeRouter = express.Router();

homeRouter.post('/', query.getList, function(req, res) {
  res.send(res.bars);
})

homeRouter.get('/', function(req, res) {
  test.callYelpApi();
  res.send('session created');
})

var mainRouter = express.Router();

mainRouter.post('/main', query.getList, function(req, res) {
  res.send(res.bars);
})

mainRouter.get('/main', function(req, res) {
  res.send('session created');
})


var userRouter = express.Router();

userRouter.post('/login', function(req, res) {
  mid.validateLogin(req, res);
})

userRouter.post('/signup', function(req, res) {
  mid.processSignup(req, res);
  // console.log('user was just added to database, redirecting to main');
})

userRouter.get('/logout', function(req, res) {
  // console.log('Before destroy ' + req.session.id);
  req.session.destroy(function() {
    console.log('session destroyed')
    res.send('You\'ve been logged out!');
  })
  // console.log('Session is: ' + req.session);
})

var menuRouter = express.Router();
menuRouter.post('/', menu.downloadMenu, test.callYelpApi, function(req, res, next) {
  res.send(res.menu);
})

// apply routes to application
app.use('/reject', rejectRouter);
app.use('/accept', acceptRouter);
app.use('/approve', approveRouter);
app.use('/submission', submissionRouter);
app.use('/home', homeRouter);
app.use('/user', userRouter);
app.use('/menu', menuRouter);
app.use('/main', mainRouter);
app.use('/admin', adminRouter);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port +'...')


module.exports = app;
