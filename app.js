var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var redis = require('redis');
var client = redis.createClient();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Redis Client 

client.on('connect', function() {
    console.log('connected');
});

/*//Redis save key:value pair
client.set('framework','AngularJS',function(err,reply){
  console.log(reply);
});

//Storing Hashes on redis
client.hmset('hashes', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

//Retrive hashes
client.hgetall('hashes',function(err,obj){
  console.log(obj);
});

//Retrive Key:value pair
client.get('framework', function(err, reply) {
    console.log(reply);
});
*/

/*//Redis Storing List
client.rpush(['list','Monday','Tuesday','Wednesday','Thursday'],function(err,reply){
  console.log(reply);
});


// Redis List Retrive
client.lrange('list', 0, -1, function(err, reply) {
    console.log(reply); 
});*/

client.exists('shank', function(err, reply) {
    if (reply == 1) {
        console.log('Key Exists!!!');
    } else {
        console.log('Key Does Not Exist...');
    }
})

//Delete Key
client.del('frameworks',function(err,reply){
  console.log(reply);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;