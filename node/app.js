var package = require('./package.json'),
    nconf = require('nconf'), 
    _ = require('underscore'),
    express = require('express'),
    http = require('http'),  
    program = require('commander');
    var chalk = require('chalk');

console.log(chalk.green('Hello API') );

nconf.argv().env().file({file:'config.json'});
program
    .version(package.version)
    .option('--fixtures', 'Initialize database with fixtures (full demo features')
    .option('--default_site', 'Create a new site (light)')
    .option('--my_site', 'Create my site')
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
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

// Routes
var routes = require('./routes')(app);
var models =  require("./models");

// Start server
var server =  http.createServer(app).listen(nconf.get('PORT'), function(){
    console.log("Server started. Port " + nconf.get('PORT'));
});
