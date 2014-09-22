'use strict';

/**
 * Module dependencies.
 */
var _package = require('./package.json'),
express = require('express'),
fs = require('fs'),
mongoose = require('mongoose'),
 _ = require('underscore'),
nconf = require('nconf'), 
http = require('http'),  
program = require('commander'),
chalk = require('chalk');

nconf.argv().env().file({file:'config.json'});

mongoose.connect('mongodb://localhost/test');






var db = mongoose.connection;


//Bootstrap models
var models_path = __dirname + '/api/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {console.log(chalk.green('Hello API') );});




var app = express();

app.configure(function(){
  app.set('port',nconf.get('PORT') );
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: true
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(  nconf.get('COOKIESECRET') ) );
  app.use(express.session( nconf.get('SESSIONSECRET') ) );
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: false , showStack: false }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

// Routes
var routes = require('./api/routes')(app);
//Start the app by listening on <port>
var port =  3002;
app.listen(port);
console.log('Express app started on port ' + port);
