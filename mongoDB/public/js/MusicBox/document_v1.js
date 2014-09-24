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
*/




// ** GLOBAL MISC VARS
var inheriting = {};
var GLOBALS;
var render;

/** 
* @class DocumentsListCtrl
**/
function DocumentsListCtrl($scope, $http , $location, $routeParams) {
		$scope.docs = DOCS;
		console.log($scope.docs)

}


 /**
 * Represents a document.
 * @class DocumentCtrl
 * @param {Object} $scope - angular service
 * @param {Object} $http -  angular service
 * @param {Object} $location -  angular service
 * @param {Object} $routeParams -  angular service
 * @param {Factory} renderfactory -  angular custom factory
 */
function DocumentCtrl($scope, $http , $location, $routeParams, renderfactory) {
		
		/**
		* init a document.
	    * @function DocumentCtrl#init
		

		*/
		$scope.init = function (){

			if(USERIN){
				//console.log(USERIN)
				$scope.userin = USERIN;
			}
		render = renderfactory();
		$scope.render = render.init();

		if(DOC){
			$scope.doc = DOC;
			$scope.$emit('docEvent', {action: 'doc_ready' });
			return;
		}
		else{
			$scope.doc = 'DOC loading';
			alert('no service here')
		}



	}

	/**
	* init sections 
	* @function DocumentCtrl#init_sections
	*/
	$scope.init_sections = function (){

		$scope.sectionstocount = 0;
		$scope.markups  = _.sortBy($scope.doc.markups,function (num) {
			return num.start;
		});
		//console.log($scope.markups)
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

		$scope.$emit('docEvent', {action: 'sections_ready' });

	}


	/**
	* fill arrays of letters for each section  {@link DocumentCtrl#distribute_markups} 
	* @param {Object} section - section object
	* @param {Start-range} section.start 	-    section start
	* @param {End-range} section.end 		-	 section end
	* @param {Number} [section_count] - section index value 
	* @function DocumentCtrl#fill_chars
	* @return {Object} letters of a section
	* @link DocumentCtrl#distribute_markups 
	* @todo remove section count param
	*/
	
	$scope.fill_chars = function (section, section_count){
		var temp_letters = new Array(); 
		var i;
		var i_array 		= 	0;
		var fulltext 		= 	'';
		var str_start 		= 	section.start;
		var str_end 		= 	section.end;
		var content_string  = 	'Scripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts useScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asd as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts  used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for(see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used asd as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts  used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBoScripts used as backend for MusicBox (see Music MusicBox (see MusicBoScripts used as backend for MusicBox (see MusicBo'
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

			/** 
			* @something here
			* @link DocumentCtrl#fill_chars
			*/

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




	

	/**
	* @description 
	* Distribute markups in layout position and push classes to letters (loop _b)
	*
	* Push right objects in right sections (distribution in arrays of objects by sections)
	* #### assuming 
	* * Document and its markups are loaded
	* * Sections are init
	*
	* #### loop overview 
	*
	* ##### each(sorted_sections,s) 
	*
	* * init globals objects
	* * fill_chars()
	* * init type-position arrays
	*
	* * each(textdatas,td)
	* * if in s.ranges 
	*
	* @return {DocEvent} emit event 'dispatched_objects']
	* @function DocumentCtrl#distribute_markups
	* @link DocumentCtrl#fill_chars
	* @todo -
	*/

	$scope.distribute_markups = function (){
		//	
		// START Looping each SECTION
		// 
		$scope.letters = new Array()
		_.each($scope.sorted_sections, function(section, index){

			console.log(section)
			$scope.fill_chars(section,index);



			//$scope.objects_sections[index] = new Array();
			$scope.sorted_sections[index]['objects'] = new Array();
			$scope.sorted_sections[index]['objects_count'] = new Array();
			$scope.sorted_sections[index]['objects_count']['by_positions'] = new Array();


			//$scope.objects_sections[index]['global'] = new Array();
			
			_.each($scope.available_sections_objects, function(o, obj_index){

				$scope.sorted_sections[index]['objects'][$scope.available_sections_objects[obj_index]] = new Array();
					// and each subs objects an array of each positions
					_.each(render.posAvailable() , function(op){ // op: left, right, ..
						$scope.sorted_sections[index]['objects_count']['by_positions'][op.name] = new Object({'count':0, 'has_object':false})
						$scope.sorted_sections[index]['objects'][$scope.available_sections_objects[obj_index]][op.name] = new Array();
					});
			});

			//
			// START Looping each TEXTDATAS
			//
			_.each($scope.markups, function(markup){

				var i_array = 0;	
					//Only if textdata is in sections ranges
				if(markup.start >= section.start && markup.end <= section.end){

					// some commons attributes
					markup.sectionin = index;

					markup.explicit_string  = 	'';
					var i;
					for (i = markup.start; i < markup.end; i++) {
						var j = i - $scope.sorted_sections[index].start;
						markup.explicit_string += $scope.sorted_sections[index].fulltext[j];
					}

					if(markup.type !== 'container'){
						$scope.sorted_sections[index].objects[markup.type][markup.position].push(markup) 
						$scope.sorted_sections[index].objects_count['by_positions'][markup.position].count++;
						$scope.sorted_sections[index].objects_count['by_positions'][markup.position].has_object  = true;
					}
					//console.log($scope.sorted_sections[index]['objects'][markup.type][markup.position])
					//console.log('pushed'+markup.position)
				}
			})
			//$scope.sorted_sections[index].objects = $scope.objects_sections[index]    
			$scope.sorted_sections[index].letters = $scope.letters[index]
		});
		//console.log($scope.objects_sections)
		// console.log($scope.letters)
		$scope.$emit('docEvent', {action: 'dispatched_objects' });
	}

// util flatten array to string
var flatten= function (n) {
		//console.log(n);
		var out = '';
			_.each(n, function(c, i){out +=  n[i]+' ';});
		return out;
}	

// ui
    $scope.push = new Object;

	$scope.push_section= function (){
		$scope.push.type = 'container';
		$scope.push.subtype = 'container';
		$scope.push.start =0;
		$scope.push.end = 100;
		$scope.push_markup();

	}

	$scope.push_markup = function (){
			if(!$scope.push.depth){
				$scope.push.depth = 1;
			}
			if(!$scope.push.start){
				$scope.push.start = 1;
			}
			if(!$scope.push.end){
				$scope.push.end = 1;
			}
			if(!$scope.push.type){
				$scope.push.type = 'markup';
			}
			if(!$scope.push.metadata){
				$scope.push.metadata= '-';
			}
			else{
				$scope.push.metadata =encodeURIComponent($scope.push.metadata);
			}
			if(!$scope.push.status){
				$scope.push.status= '-';
			}
			if(!$scope.push.subtype){
				$scope.push.subtype = 'h1';
			}
            if(!$scope.push.position){
				$scope.push.position = 'inline';
			}


			// todo : post api
			 $http.get('http://localhost/api/v1/doc/'+$scope.doc.title+'/markups/push/'+$scope.push.type+'/'+$scope.push.subtype+'/'+$scope.push.start+'/'+$scope.push.end+'/'+$scope.push.position+'/'+$scope.push.metadata+'/'+$scope.push.status+'/'+$scope.push.depth).success(function(m) {
				//console.log(m)
				$scope.doc = m;
				$scope.$emit('docEvent', {action: 'doc_ready' });


			 })

	}
	$scope.offset_markups = function (){
		$http.get('http://localhost/api/v1/doc/'+$scope.doc.title+'/markups/offset/left/0/1/1').success(function(m) {
			console.log(m)
			$scope.doc = m;
			$scope.$emit('docEvent', {action: 'doc_ready' });


		})

	}
	$scope.offset_markup = function (markup){
		$http.get('http://localhost/api/v1/doc/'+$scope.doc.title+'/markup/'+markup._id+'/offset/left/0/1/1').success(function(m) {
			console.log(m)
			//$scope.doc = m;
			//$scope.$emit('docEvent', {action: 'doc_ready' });
		})
	}

	/**
	* delete a markup on click
	* @function DocumentCtrl#delete_markup
	* @param  {Object} markup - markup to delete
	*/
	$scope.delete_markup = function (markup){
		 if(markup.type=="container"){
		 	alert('can hold objects!')
		 }
		 $http.get('http://localhost/api/v1/doc/'+$scope.doc.title+'/markups/delete/'+markup._id).success(function(m) {
			console.log(m)
			$scope.doc = m;
			$scope.$emit('docEvent', {action: 'doc_ready' });
		})
	}

	/**
	* turn links clickable out of angular routing
	* @function DocumentCtrl#external_link
	* @param  {String} link - redirect link
	*/
	$scope.external_link = function (link){
		window.location = link;
	}
	
	$scope.upload_file_image = new Object({'uploaded': false});


	$scope.preuploadFile = function(files){
		$scope.upload_file_image.file = files[0];
		return;
	


	}

	$scope.uploadFile = function(){
		
		
		var fd = new FormData();
		fd.append("image", $scope.upload_file_image.file);

		
		$http.post('http://localhost/upload', fd, { withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity } ).success(function(m) {
		
        	$scope.upload_file_image.uploaded = true

        	$scope.upload_file_image.basename = m[0].basename
			$scope.upload_file_image.path = m[0].path
			$scope.upload_file_image.type = m[0].type



				
				}).error(function(err){
					console.log(err)
				})


	}



	/**
	*  EVENTS 
	* 
	* Get broadcasted events
	* @function DocumentCtrl#events
	*/

	$scope.$on('doc', function(event, args) {
		if(args.action){
			console.log('EVENT logger '+args.action)
			if(args.action == 'reload'){
				//alert('d')
			}
			if(args.action == 'doc_ready'){
				$scope.init_sections()
			}
			if(args.action == 'sections_ready'){
				$scope.distribute_markups()
			}

		}

	});

$scope.init() 
} // CTRL