'use strict';
console.log('DocumentCtrl @ /public/js/MusicBox/document_v1.js');
/*
 ____________________
|*      * *    * *  *|
|*      M *    M    M|
|       * u    *    *|
|      s  *       s *|
|         *    i     |
|   c   * c    *    *|
| B   *   *         *|
| *    o  o         *|
|     *   x         *| 
|*||||*||||||||||||*||
|||||||||v.1||||||||||  
||o                o||      
||  Boite à musique ||______|
||o  ~ MusicBox    o||______| 
||||||||||||||||||||||  


Welcome here ! 
//
Functions (angularJS) to render a documents.
*/


// ** GLOBAL MISC VARS
var inheriting = {};

// MAIN document controller
// require files "filters.js" and "services.js" for CTRLs
function DocumentCtrl($scope, $http , $location, $routeParams) {
		$scope.doc = DOC;
		console.log($scope.doc)
}