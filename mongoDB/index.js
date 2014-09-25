'use strict';

/**
 * Module dependencies.
 */
var _package = require('./package.json'),
express = require('express'),
fs = require('fs'),
jade = require('jade'),

mongoose = require('mongoose'),
 _ = require('underscore'),
nconf = require('nconf'), 
http = require('http'),  
program = require('commander'),
chalk = require('chalk'),
passport = require('passport'),
logger = require('mean-logger'),
 mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers');

nconf.argv().env().file({file:'config.json'});





var auth = require('./api/authorization');




var db = mongoose.connection;
var dbz = mongoose.connect('mongodb://localhost/testez');

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
db.once('open', function callback () {






});




  console.log(chalk.green('Hello API') );






var app = express();

 //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

   app.enable("jsonp callback");


app.configure(function(){
  app.set('port',nconf.get('PORT') );
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: true
  });
    app.use(express.cookieParser('secreeet') );

        app.use(express.bodyParser());
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride('secreeet'));
  

        //express/mongo session storage
        app.use(express.session({
            secret: 'secreeet',
            store: new mongoStore({
                db: mongoose.connection.db,
                collection: 'sessions',
                clear_interval: 3600,
                auto_reconnect: true
            })
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
       // app.use(helpers('musicbox'));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
       // app.use(app.router);
        
        //Setting the fav icon and static folder
        app.use(express.favicon());

       



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
        res.header("Access-Control-Allow-Origin", "*:*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });



require('./api/passport')(passport);


// Routes
var routes = require('./api/routes')(app, passport, auth);







var server =  http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("*/* Express server listening on port " + app.get('port'));
 // require('./api/socket.js').say('hello socket')

});

var io;
exports.io = io =  require('socket.io').listen(server, {log:false, origins:'*:*'})
io.on('connection', function(socket){
    console.log("socket connected ");

    socket.on('news', function(data){
     
      require('./api/socket').socketer(socket, data);


    });
  });



// logger.init(app, passport, mongoose);
//expose app




exports = module.exports = app;




