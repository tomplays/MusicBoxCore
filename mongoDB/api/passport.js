'use strict';

var mongoose = require('mongoose'),
    //TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    //BufferAppStrategy = require('passport-bufferapp').Strategy,
    User = mongoose.model('User'),
    request = require('request');

var facebook = new Object({
        'clientID': "717370198340854",
        'clientSecret': "a66279a9a1995742a66431b6eee82a56",
        'callbackURL': "http://localhost/auth/facebook/callback" // 
});

module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        //console.log('deserialize')
      
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
         //   console.log('user in')

            done(err, user);
        });
        
    });

    //Use bufferapp strategy
   

    //Use twitter strategy
    

    //Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: facebook.clientID,
            clientSecret: facebook.clientSecret,
            callbackURL: facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            //console.log('CB!')
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    //console.log(user)
                    return done(err);
                }
                if (!user) {
                    
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,

                        provider: 'facebook',
                        facebook: profile._json,
                        image_url : "http://graph.facebook.com/" + profile._json.id + "/picture?type=square"
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                      //  console.log(user)
                        return done(err, user);
                    });
                  
                } else {
                                   //     console.log(user)

                    return done(err, user);
                }
            });
           
        }
    ));
};