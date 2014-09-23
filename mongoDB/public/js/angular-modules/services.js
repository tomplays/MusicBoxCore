
'use strict';

// 

// this file contains 

// event register

// 4 services : 

// document 
// user
// translation
// sockets





// thx to btford seed  : https://github.com/btford/angular-socket-io-im/
var musicBox =  angular.module('musicBox.services', []);
/// to load with config.json via index / routes.
//console.log(USE_SOCKET_SERVER)
//var USE_SOCKET_SERVER = true;
musicBox.run(function($rootScope) {
    console.log('cross controllers service listening ..')
    /*
        Receive emitted message and broadcast it.
    */
    // $rootScope.$on('summarizeEvent', function(event, args) {
       // $rootScope.$broadcast('summarize', args);
    // });
});
musicBox.run(function($rootScope, $http, $route) {
 
  $rootScope.$on('$routeChangeSuccess', function (e, cur, prev) {
    if(cur && prev && cur !== prev){
      console.log(prev.originalPath)
      console.log(cur.originalPath)



     // $rootScope.$emit('docEvent', {action: 'reload' });

      ///////if(prev.originalPath == '')
      //
      // > from '/docs/:mode' to '/doc/:docid'

      //console.log('route.change')

      console.log($route)
  }
  });

   $rootScope.$on('renderEvent', function(event, args) {
          $rootScope.$broadcast('render', args);
      });  

     $rootScope.$on('render', function(event, args) {
        console.log(args, event)

    }); 

    $rootScope.$on('docEvent', function(event, args) {
        $rootScope.$broadcast('doc', args);
    });
    $rootScope.$on('sectionEvent', function(event, args) {
        $rootScope.$broadcast('section', args);
    });
    $rootScope.$on('letterEvent', function(event, args) {
        $rootScope.$broadcast('letter', args);
    });
    $rootScope.$on('fragmentEvent', function(event, args) {
        $rootScope.$broadcast('fragment', args);
    });
    $rootScope.$on('keyEvent', function(event, args) {
        $rootScope.$broadcast('key', args);
    });



})
