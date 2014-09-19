var models = require("../models"),
_ = require('underscore'),
nconf = require('nconf'),
fs = require('fs'),
jf = require('jsonfile');

var inheriting = { };
var DAO = require("sequelize/lib/dao"),
    Utils = require("sequelize/lib/utils"),
    bcrypt = require('bcrypt'),
    gravatar = require('gravatar');


  // User.auth(function(u,p){ console.log(u,p); });

exports.apiprofile_auth = function(req, res){
    console.log(req.params.password)
    if (parseInt(req.params.id)) {
        if(   (req.params.static && req.params.static == 'static') ||  (nconf.get('DATABASE_DOCSAPI_MODE') == 'static' )  ) {
            //console.log('static')
            res.sendfile(parseInt(req.params.id)+'.json', {root: 'public/statics/users/profile'});
            return;
        }
        else{
          
  var user =  models.User.find(parseInt(req.params.id)).success(function(user) {
                if(user){




                                var auth_ = user.auth(user.username,req.params.password)
                                

                                auth_.success(function() {
                                      console.log("success " + new Date().getTime());
                                     res.send(user);
                                 })

                                auth_.error(function() {
                                      console.log("error " + new Date().getTime());
                                     res.send('err');
                                 })



                }
});







        }
     }
}

exports.apiprofile_register= function(req, res){
    var user = models.User.build({username: 'dzdzd',  email: 'ddkdk@gmail.com',      color: 'dqsqs', password: "a"}).save().success(function(newuser){
        res.send(newuser)
    });
}
exports.apiprofile_list= function(req, res){
  if(req.params.apisecret !== nconf.get('API_SECRET')) {
     res.send('api key mismatch')
     return;
  }
  var users =  models.User.findAll().success(function(users) {
                if(users){

                  res.send(users)
                }

            })    
  //var users = [{ id: 1, username: 'admin', password: nconf.get('ADMIN_KEYPASS'), email: 'bob@example.com' }];
  

  
}
exports.apiprofile = function(req, res){
	if (parseInt(req.params.username_or_id)) {
        if(   (req.params.static && req.params.static == 'static') ||  (nconf.get('DATABASE_DOCSAPI_MODE') == 'static' )  ) {
            //console.log('static')
            res.sendfile(parseInt(req.params.username_or_id)+'.json', {root: 'public/statics/users/profile'});
            return;
        }
        else{
            var user =  models.User.find(parseInt(req.params.username_or_id)).success(function(user) {
                if(user){
                    //  user.getRoles().success(function(Roles) {
                            user.getRooms().success(function(Rooms) {
                                if(Rooms){
                                  user.getUsermetas().success(function(um) {
                                        if (user) {
                                            var user_j = {};
                                            user_j.root = user;
                                            user_j.root.email ='xxx';
                                            user_j.root.password='xxx';
                                            // USELESS TILL NOW     user_j.roles = Roles;
                                            user_j.usermetas = um;
                                            user_j.rooms = Rooms;
                                            if(req.params.static && req.params.static == 'write'){               
                                                /*
                                                var stream = fs.createWriteStream("");
                                                stream.once('open', function(fd) {
                                                  stream.write(user_j);
                                                  stream.end();
                                                });
                                                */

                                                var file = './public/statics/users/profile/'+parseInt(req.params.username_or_id)+'.json';
                                                
                                                 user_j.root.email ='xxx-static';
                                                 user_j.root.password='xxx-static';

                                                jf.writeFile(file, user_j, function(err) {
                                                  console.log(err);
                                                  res.json(user_j); 
                                                })
                                            }
                                            else{
                                                 res.json(user_j);  
                                            }
                                                                                     
                                        } 
                                        else {
                                            res.json('no user');
                                        } 
                                    });
                                }
                                else{
                                    res.json('no user');
                                }
                            });
                    //  });
                }
            else{
                res.json('no user');
            }
        });

        }
    } 
    else{
	 	var user = models.User.find({where: "username LIKE '"+req.params.username_or_id+"'"}).success(function(user) {
			if (user) {
                ////////// use where ...++ showing pass ! res.json(user);
           } 
			else {
				res.json('no user');
            }
		});
   	}
};










