var models = require("../models"),
_ = require('underscore'),
nconf = require('nconf'),
fs = require('fs'),
jf = require('jsonfile');

var inheriting = { };

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










