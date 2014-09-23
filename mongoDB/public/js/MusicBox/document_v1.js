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
var GLOBALS;
// MAIN document controller
// require files "filters.js" and "services.js" for CTRLs
function DocumentsListCtrl($scope, $http , $location, $routeParams) {
		$scope.docs = DOCS;
		console.log($scope.docs)

}

function DocumentCtrl($scope, $http , $location, $routeParams, renderfactory) {

	
	$scope.init = function (){

		var render = renderfactory();
		$scope.render = render.init();

		if(DOC){
			console.log('natural loaded')
			$scope.doc = DOC;
     		$scope.$emit('docEvent', {action: 'doc_ready' });
			return;
		}
		else{
			// coming from listing to a doc.
			console.log('need api call')
			$scope.doc = 'DOC loading';
			alert('no service here')
		}
	}
	
$scope.prepare_sections = function (){

	$scope.sectionstocount = 0;
	$scope.markups  = _.sortBy($scope.doc.markups,function (num) {
    	return num.start;
   	});
	//http://localhost:3002/api/v1/doc/bloue0.6898315178696066/markups/push/container/section/0/990/left/hello/visible/1
    $scope.sorted_sections = _.filter($scope.markups, function(td){ return  td.type == 'container'; });
	$scope.sectionstocount = _.size($scope.sorted_sections);
	$scope.sections_to_count_notice = ($scope.sectionstocount == 0) ? true : false;
	// console.log($scope.sorted_sections)


	$scope.objects_sections = new Array();
	$scope.objects_sections['global_by_type'] = new Array();
	_.each($scope.available_sections_objects, function(o, obj_index){
		$scope.objects_sections['global_by_type'][o] = new Array();
		
	});

	$scope.$emit('docEvent', {action: 'sections_prepared' });

}


// sub loop _a
// fill arrays of letters for each section
// required init : 
$scope.fill_chars = function (section, section_count){
	var temp_letters = new Array(); 
	var i;
	var i_array 		= 	0;
	var fulltext 		= 	'';
	var str_start 		= 	section.start;
	var str_end 		= 	section.end;
	var content_string  = 	'Scripts used as backend for MusicBox (see MusicBo'
	//$scope.doc.content;

	for (i = str_start; i <= str_end; i++) {
		var letter_arr = new Object();
		var ch = '';
		ch = content_string[i];
		
		if (ch === " ") {
          ch = ' ';

    	}
    	if (!content_string[i]) {
          ch = ' ';
    	}
        fulltext += ch;
		letter_arr['char'] = ch;

		//letter_arr['fi_nd'] = new Object({'fi': false, 'nd':false/*, 'md':false*/});
		letter_arr.fi_nd = new Object({'fi': false, 'nd':false/*, 'md':false*/});
		letter_arr.classes = new Array();



		letter_arr.order = i;
		letter_arr.action = '';
		letter_arr.rindex = i_array;
		letter_arr.lindex= i;
		
		//unsued a heavy	letter_arr.objects = new Array();
		letter_arr.href= new Array();
		letter_arr.sectionin = section_count;
		letter_arr.mode= 'display';


		letter_arr.state = new Object({ 'statemode' : 'loading','select' : false,'clicked' : false,'inrange' : false , 'flat': {}  });
		letter_arr.sel = false;
		temp_letters[i_array]  = letter_arr;
		i_array++;
	}
	 
	 if(!fulltext){
	 	fulltext = '-';
	 }

	$scope.letters[section_count]= temp_letters;

	$scope.sorted_sections[section_count].fulltext = fulltext;
}




/* loop _b
// Push right objects in right sections (distribution in arrays of objects by sections)

// REQUIRED INITs: 
  - loaded tds
  - prepared sections
	
  - overview: 

	each(sorted_sections,s)
		
		init globals objects
		fill_chars()
		init type-position arrays
		
		each(textdatas,td)
			if in s.ranges 
				dispacth in array(type, position)

				if markup 
					dispatch in array(position = inline)

					loop from s.start to s.end 
						add td.type, td.classes,.. to letters
			 	
		push to "all" objects
		push to "global' objects
					



 return 
 > emit event 'dispatched_objects'

*/





$scope.distribute_markups = function (){

	
	//	
	// START Looping each SECTION
	// 
	$scope.letters = new Array()
	_.each($scope.sorted_sections, function(section, index){
		//console.log(section, index)
		$scope.fill_chars(section,index);
	});

	


	// console.log($scope.letters)
	$scope.$emit('docEvent', {action: 'dispatched_objects' });


}








// EVENTS 

	$scope.$on('doc', function(event, args) {
		if(args.action){
			console.log('EVENT logger '+args.action)
			if(args.action == 'reload'){
				//alert('d')
			}
			if(args.action == 'doc_ready'){
				$scope.prepare_sections()
			}
			if(args.action == 'sections_prepared'){
				$scope.distribute_markups()
			}

		}

	});



$scope.init()
}



// ?? 
//DocumentCtrl.$inject = ['$scope', '$http' , '$location', '$routeParams', ''];
