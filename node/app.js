var package = require('./package.json'),
    nconf = require('nconf'), 
    _ = require('underscore'),
    express = require('express'),
    http = require('http'),  
    program = require('commander');

nconf.argv().env().file({file:'config.json'});
program
    .version(package.version)
    .option('--fixtures', 'Initialize database with fixtures')
    .option('--drop', 'drop db')
    .option('--tags', 'tags')
    .parse(process.argv);
var app = express();
// Configuration
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

// Routes
var routes = require('./routes')(app);
var models =  require("./models");

// Start server
var server =  http.createServer(app).listen(nconf.get('PORT'), function(){
    console.log("Server started. Port " + nconf.get('PORT'));
});