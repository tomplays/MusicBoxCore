var _ = require('underscore'),
fs = require('fs'),
inheriting = { },
app,
nconf = require('nconf'),
models = require("../models");

//var baseuse_url = nconf.get('ROOT_URL')+':'+ nconf.get('PORT');
//(hardcoded in DB, maybe use rel ?)
var baseuse_url = 'http://localhost:3021';
var git_url = 'https://github.com/tomplays/MusicBox';
var hardcoded_real_published = '2013-12-11T14:30:46.395Z'; // un bel apres-midi d'hiver, avec un poney
var sockets_url = 'http://localhost:3013';

exports.doc_build = function(user, room, sample_number){
	/*
	1. hello world / Homepage 
	2. Your first document


	*/

	var 	nodes 						= new Array()
	var  	tds 						= new Array();
	var  	dms 						= new Array();
	var 	user_name 					= user.username
	var 	external_i					= false;
	var 	doc_slug				    = '-';
	var 	open_edit				    = true;

	var 	ishome						= false;
	var 	d_order						= Math.round(Math.random(0,1)*1000);
	var 	d_renderas 					= 'lire';
	var     richmode 					= true; 
	var		sample_content				= "";


	// less annoying for tests..
	var doc_secret				=  'M';
	if(sample_number==100){
		var doc_secret				=  exports.makesecret(13);
	}

	if(sample_number==0){
		sample_content			+= "";
		kind_i					= 'document';
		section_i				= '';
		doc_title				= '   ';
		doc_slug				= '';
	}

	else if(sample_number==1){
	

		sample_content 			+= 'Welcome to your own MusicBox site !';

		kind_i					= 'document';
		section_i				= 'featured_second';
		doc_title				= 'Homepage';
		doc_slug				= 'homepage';
		ishome					= true;
	
		tds = new Array(
				[{ css: '',	type: 'section', subtype: 'text', metadata : '', start: 0, end: 149}],
			    [{position:'global', 	css: 'child_section' , type: 'child_section', ext_doc:2 , subtype: 'child_section', metadata : 'Our first document', start:0, end: 34}]
		);
		var shortexcerpt = 'Homepage';
		dms = new Array(
			[{meta_key: 'footer_center_html',				meta_value: 'Homepage' }],
			[{meta_key: 'image_thumb', 						meta_value: baseuse_url+'/img/docs/4/music-box.jpg' }],
			[{meta_key: 'short_doc_model',					meta_value: 'image_left_title_excerpt' }],
			[{meta_key: 'short_excerpt',					meta_value: shortexcerpt }],
			[{meta_key: 'use_authorcard', 					meta_value: 'no' }],
			[{meta_key: 'share_notice', 					meta_value: 'Partager' }],
			[{meta_key: 'branding_class', 					meta_value: '' }], 
			[{meta_key: 'block_bgcolor',					meta_value: 'black_bg' }],
			[{meta_key: 'block_color',						meta_value: 'white_atext' }],
			[{meta_key: 'single_theme', 					meta_value: 'model-lh-f fl-th-p' }],
			[{meta_key: 'kind',								meta_value: 'classic-post' }],
			[{meta_key: 'doc_notices_before_title',			meta_value: 'MusicBox Demo site'}],
			[{meta_key: 'doc_notices_after_title',			meta_value: '' }],
			[{meta_key: 'text_class', 						meta_value: 'high_fat' }]
			
		);
		var nodes = new Array('musicbox','lorem-ipsum', 'blou');
	}

	
	
	else if(sample_number==2){

		/*
		fs.readFile("public/import/constitution_fr.txt", "utf8", function(error, datai) {
				doc.content = datai;
				doc.save();
		});
		*/

		sample_content			+= "Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit.Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem with section background and padding modern styles. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.";
		sample_content			+= "(2x) Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.";
		sample_content			+= "(2x) Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.";

		kind_i					= 'document';
		section_i				= 'featured_second';
		doc_title				= 'Lorem Ipsum Blou blou';
		doc_slug				= 'Lorem-ipsum-blou-blou';
	
		tds = new Array(
				[{ type: 'section', subtype: 'text', metadata : '', start: 0, end: 167}],



				[{ metadata : '',subtype: 'strong' , type: 'markup',start:5, end:20}],
				[{ metadata : '',subtype: 'em' , type: 'markup',start:35, end:60}],
				[{ metadata : '',subtype: 'strike' , type: 'markup',start:75, end:90}],
		


			//	[{ type: 'section_class', subtype: '', metadata : 'cloud_bg', start: 0, end: 167}],
			//	[{ type: 'section_class', subtype: '', metadata : 'pa20_topbtm',  start: 0, end: 167}],
				[{ type: 'section', subtype: 'text', metadata : '', start: 168, end:262}],
				[{ type: 'section', subtype: 'text', metadata : '', start: 263, end:508}],
				[{ type: 'section', subtype: 'text', metadata : '', start: 509, end:708}],


				[{ metadata : '',subtype: 'strong' , type: 'markup',start: 609, end:705}],
				

				[{position:'under', depth: 1,   type: 'note', subtype: 'wikipedia',  metadata : 'this is a long with <a><em>html</em> link</a> note/freebase under section. Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit.Sed non risus. Suspendisse lectus tortor, dignissim sit amet.', start: 10, end:29}],
		 		[{position:'right', depth: 1,   type: 'note', subtype: 'note',       metadata : 'this is a long with <a><em>html</em> link</a> note/freebase under section. Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit.Sed non risus. Suspendisse lectus tortor, dignissim sit amet.', start: 50, end:69}],
		 		[{position:'right', depth: 1,   type: 'note', subtype: 'note',       metadata : 'this is a long with <a><em>html</em> link</a> note/freebase under section. Lorem Ipsum Blou Blou ! Dolor sit amet, consectetur adipiscing elit.Sed non risus. Suspendisse lectus tortor, dignissim sit amet.', start: 100, end:112}],
		 		[{position:'left', 	depth: 10,  type: 'note', subtype: 'comment',    metadata : 'a comment',  start: 700, end:706}]
			);


		var shortexcerpt = 'blou';
		dms = new Array(
					[{meta_key: 'footer_center_html',				meta_value: '#'+sample_number+ ' - '+doc_title+' - <a href="'+git_url+'">MusicBox</a>' }],
					[{meta_key: 'image_thumb',						meta_value: baseuse_url+'/img/lorem/600-400.jpg' }],
					[{meta_key: 'short_doc_model',					meta_value: 'image_left_title_excerpt' }],
					[{meta_key: 'short_excerpt',					meta_value: shortexcerpt }],
					[{meta_key: 'use_authorcard', 					meta_value: 'full_last' }],
					[{meta_key: 'share_notice', 					meta_value: 'Partager' }],
					[{meta_key: 'text_class',						meta_value: 'medium' }],
					[{meta_key: 'branding_class', 					meta_value: '' }], 
					[{meta_key: 'color_a',							meta_value: '#e67e22' }],
					[{meta_key: 'color_b',							meta_value: '#f39c12' }],
					[{meta_key: 'block_bgcolor',					meta_value: 'black_bg' }],
					[{meta_key: 'block_color',						meta_value: 'white_atext' }],
					[{meta_key: 'single_theme', 					meta_value: 'model-lh-f fl-th-p' }],
					[{meta_key: 'kind',								meta_value: 'classic-post' }],
					[{meta_key: 'share_fragment',					meta_value: 'after_title' }],
					[{meta_key: 'share_notice', 	   				meta_value: 'Share' }],
					[{meta_key: 'keywords_notice', 					meta_value: 'Keywords' }],
					[{meta_key: 'editor_notice', 					meta_value: 'Edited by' }],
					[{meta_key: 'creator_notice', 					meta_value: 'Created by' }],
					[{meta_key: 'nodes_fragment', 					meta_value: 'full_last' }],
					[{meta_key: 'date_fragment', 					meta_value: 'full_first' }],
					[{meta_key: 'text_class', 						meta_value: 'high_fat' }],
					[{meta_key: 'doc_notices_before_title',			meta_value: ''}],
					[{meta_key: 'doc_notices_after_title',			meta_value: 'Display a sample text' }]
				);
		var nodes = new Array('musicbox','lorem-ipsum', 'blou');


	}
	
	else{
		sample_content		   += "-";
		doc_title				= "-";
		kind_i					= '-';
		section_i				= 'featured_list';
		doc_slug				= 'p'+Math.random(100)+'99'+Math.random(100);

	}	

// DOC CREATE START
var doc = models.Idoc.build({title:doc_title, slug: doc_slug, renderas : d_renderas, content: sample_content,richmode:richmode, status: 'public', section:section_i , order:d_order, kind: kind_i, external : external_i, ishome :ishome, secret: doc_secret, real_published: hardcoded_real_published , open_edit:open_edit		}).save().success(function(doc){


	var pro1 = models.Process.build({text:'view_doc', status: 'on' , order:0}).save().success(function(pro1) {
		doc.addProcess(pro1).success(function() {
			
			var rol1= models.Role.build({text:'view_doc', role:'owner', status: 'active' }).save().success(function(rol1) {
				pro1.addRole(rol1).success(function() { });
				user.addRole(rol1).success(function() { });
				room.addRole(rol1).success(function() { });
				doc.addRole(rol1).success(function() { });
			});
		});	
	});
	var pro2 = models.Process.build({text:'comment_doc', status: 'on' , order:0}).save().success(function(pro2) {
		doc.addProcess(pro2).success(function() {
			
			var rol2 = models.Role.build({text:'comment_doc', role:'owner', status: 'active' }).save().success(function(rol2) {
				pro2.addRole(rol2).success(function() { });
				user.addRole(rol2).success(function() { });
				room.addRole(rol2).success(function() { });
				doc.addRole(rol2).success(function() { });
			});
		});	
	});
	
if( sample_number==105 || sample_number==106){
			var userzzzz = models.User.build({username: '-----', color:"#dbb6f9", password: "tom", email:"homeqsdprow@gmail.com"}).save().success(function(userzzzz) {

				var uma = models.Objectmeta.build({meta_key:'website_url', meta_value: 'https://twitter.com/---'}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});

				var uma = models.Objectmeta.build({meta_key:'profile_image', meta_value: 'img/users/--.jpeg'}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});

				var uma = models.Objectmeta.build({meta_key:'has_bitwallet', meta_value: true}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
			
				var uma = models.Objectmeta.build({meta_key:'has_lab', meta_value: true}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
				var uma = models.Objectmeta.build({meta_key:'has_earlyadopter', meta_value: true}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
				
				var uma = models.Objectmeta.build({meta_key:'current_place_city', meta_value: 'Paris'}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
				var uma = models.Objectmeta.build({meta_key:'current_place_country', meta_value: 'France'}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
				var uma = models.Objectmeta.build({meta_key:'short_bio', meta_value: '--'}).save().success(function(uma) {
						userzzzz.addUsermeta(uma).success(function() {});
				});
				
			doc.addEditor(userzzzz).success(function() { });
			var pro2a = models.Process.build({text:'doc_creator', status: 'on' , order:0}).save().success(function(pro2a) {
					doc.addProcess(pro2a).success(function() {
						console.log('pro2a added to doc 1');
						var rol33 = models.Role.build({text:'doc_creator', role:'owner', status: 'active' }).save().success(function(rol33) {
							pro2a.addRole(rol33).success(function() { });
							userzzzz.addRole(rol33).success(function() { });
							room.addRole(rol33).success(function() { });
							doc.addRole(rol33).success(function() { });
						});
					});	
			});


			var pro2 = models.Process.build({text:'doc_editor', status: 'on' , order:0}).save().success(function(pro2) {
							doc.addProcess(pro2).success(function() {
										var rol33 = models.Role.build({text:'doc_editor', role:'owner', status: 'active' }).save().success(function(rol33) {
											pro2.addRole(rol33).success(function() { });
											user.addRole(rol33).success(function() { });
											room.addRole(rol33).success(function() { });
											doc.addRole(rol33).success(function() { });
										});

							});	
			});
		});
	}
	else{ 
		var pro3 = models.Process.build({text:'doc_creator', status: 'on' , order:0}).save().success(function(pro3) {
				doc.addProcess(pro3).success(function() {
					//console.log('pro2 added to doc 1');
					var rol3 = models.Role.build({text:'doc_creator', role:'owner', status: 'active' }).save().success(function(rol3) {
						pro3.addRole(rol3).success(function() { });
						user.addRole(rol3).success(function() { });
						room.addRole(rol3).success(function() { });
						doc.addRole(rol3).success(function() { });

					});

				});	
		});
		//doc.addEditor(user).success(function() { });
		//doc.addCreator(user).success(function() { });
	}

	// logs for a doc
	models.Log.build({text: 'd', verb: 'created', object : 'document',  subject: 'new', author: user_name}).save().success(function(log) {
		doc.addDoclog(log);
	});	
	
	models.Log.build({text: 'd', verb: 'edited', object : 'document', subject: 'title', author: user_name}).save().success(function(log) {
		doc.addDoclog(log);
	});	
	models.Log.build({text: 'd', verb: 'published', object : 'document',  subject: 'published', author: user_name}).save().success(function(log) {
		doc.addDoclog(log);
	});	
	
	_.each(tds, function(td){	
		models.Textdata.build(td[0]).save().success(function(textdata) {
			textdata.setTextdataer(doc);
		});
	});
	//console.log('textdatas for doc #'+sample_number+' ok');

	_.each(dms, function(dm){	
		models.Docmeta.build(dm[0]).save().success(function(docmeta) {
			docmeta.setDocmetaer(doc);
		});
	});

	//console.log('docmetas for doc #'+sample_number+' ok');
	
	_.each(nodes, function(node){	
		console.log(node)
		var nodefound = models.Node.find({
	 	where: {slug:node}}).success(function(nodefound) {
			if(nodefound){
				console.log('found'+nodefound)
				//nodefound.addIdoc(doc);
				doc.addNode(nodefound)
				nodefound.increment('objectcount', {by:1});
			}
			else{
				console.log('NOt found')
				//console.log(node)
				var nodefound = models.Node.build({ name: node , slug: node , taxonomy:'test', objectcount:1}).save().success(function(nodefound) {
					//console.log(nodefound)
					//nodefound.addIdoc(doc);
					doc.addNode(nodefound)
					//nodefound.increment('objectcount', {by:1});
				});
			}			
		});
	});

	console.log('doc #'+sample_number+' complete');
	room.addIdoc(doc);
	return doc;

	}); // doc create
} // function



exports.create_process_and_role_for_room_for_user = function(room,user,capability){
	var pro1 = models.Process.build({text:capability, status: 'on', order:1000 }).save().success(function(pro1) {
		room.addProcess(pro1).success(function() {
			if(user==0 ){var role_attr = 'anybody';	}
			else if( user=='member'){var role_attr = 'member';}
			else{var role_attr = 'user';}
			
			var rol3 = models.Role.build({text:capability, role:role_attr, status: 'active' }).save().success(function(rol3) {
				room.addRole(rol3).success(function() { 
					if(user==0 || user=='member'){}
					else{
						user.addRole(rol3).success(function() { });
					}
					pro1.addRole(rol3).success(function() { });
		 		});
			});
		});
	});
}



exports.user_create_room = function(room, user){

		var room1 = models.Room.build({name: 'MusicBox' , slug: 'Mb', owners:user.id }).save().success(function(room1) {
								
				// adds some properties  "meta" for room
				exports.meta_room(room1);

				models.Log.build({text: '"blou room created" ', verb: 'create_room', subject: 'room_creation', author: 'system'}).save().success(function(log) {
					room1.addRoomlog(log);
				});	

     			room1.addUser(user).success(function(user) {
					models.Log.build({text: '"blou Editroom"', verb: 'join_room', subject: 'room_joined', author: user.username}).save().success(function(log) {
						room1.addRoomlog(log);
					});	
     			});

     			exports.create_process_and_role_for_room_for_user(room1 ,0,'view_room');
				exports.create_process_and_role_for_room_for_user(room1 ,0,'subscribe_room');

				exports.create_process_and_role_for_room_for_user(room1 ,0,'join_room');

				exports.create_process_and_role_for_room_for_user(room1 , 0,'view_docs');
				
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'view_metas');
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'view_logs');
				exports.create_process_and_role_for_room_for_user(room1 ,'member', 'view_users');
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'use_docmarklet');
				exports.create_process_and_role_for_room_for_user(room1 ,'member', 'view_tools');

				exports.create_process_and_role_for_room_for_user(room1 ,user, 'post_livemsg');
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'create_docs');
		    	exports.create_process_and_role_for_room_for_user(room1 ,user, 'publish_docs');
				exports.create_process_and_role_for_room_for_user(room1 ,user, 'edit_metas');
				exports.create_process_and_role_for_room_for_user(room1 ,user, 'change_room_name');
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'view_roles');
				exports.create_process_and_role_for_room_for_user(room1 ,0, 'view_processes');
				exports.create_process_and_role_for_room_for_user(room1 ,0,'fork_room');

				console.log('room ok');
				var doc = 0;
				doc_count = 2;

				for (var u=1;u<=2;u++){
					exports.doc_build(user, room1, u)
				}
				//exports.doc_build(user, room1, 15)
				//exports.doc_build(user, room1, 1)

				return room;
     			
			});

}


exports.user_give_rights = function(user){
	if(user.username== 'Tom'){


	
				var rol1 = models.Role.build({text:'edit_profile', role:'owner', status: 'active' }).save().success(function(rol1) {
						user.addRole(rol1).success(function() { 
					//		console.log('rol1 added to room 1');
					//		console.log(rol1);
						 });
				});
				
				var rol2 = models.Role.build({text:'edit_job', role:'owner', status: 'active' }).save().success(function(rol2) {
						user.addRole(rol2).success(function() { 
					//		console.log('rol2 added to orom 1');
					//		console.log(rol2);
						 });
				});
				console.log('rights set for '+user.username)
	}
	else{
						console.log('rights NOt SET for ???')

	}
	
}
exports.meta_room = function(room){

	var metas_array = new Array();
	var meta =  models.Objectmeta.build({ meta_key:'google_analytics_code',meta_value:'XXXXX-XXXXXXX'}).save().success(function(meta) {
			room.addObjectmeta(meta).success(function() {});
	});
	var meta =  models.Objectmeta.build({ meta_key:'background_image',meta_value:baseuse_url+'/img/lorem/400-400.jpg' }).save().success(function(meta) {
			room.addObjectmeta(meta).success(function() {});
	});	
	var welcome_text= 'blou - ';
	var meta =  models.Objectmeta.build({ meta_key:'welcome_text',meta_value:welcome_text }).save().success(function(meta) {
			room.addObjectmeta(meta).success(function() {});
	});
	var meta =  models.Objectmeta.build({ meta_key:'baseline_text',meta_value:'/-)' }).save().success(function(meta) {
			room.addObjectmeta(meta).success(function() {});
	});
	console.log('meta keys for room ok');
}

exports.build_a_user = function(user){

	if(user == 'user_sys'){
			var user = models.User.build({username: 'system_bot', color:"#000", password: "6tem_b0t", email:"hazedds@gmail.com"}).save().success(function(user) {
			
				var uma =models.Objectmeta.build({meta_key:'current_place_country', meta_value: 'localhost'}).save().success(function(uma) {
						user.addUsermeta(uma).success(function() {});
				});
				var uma = models.Objectmeta.build({meta_key:'short_bio', meta_value: '\"Kernel panic, default and stupid admin actions\"'}).save().success(function(uma) {
						user.addUsermeta(uma).success(function() {});
				});
				var uma = models.Objectmeta.build({meta_key:'profile_image', meta_value: 'blou.png'}).save().success(function(uma) {
						user.addUsermeta(uma).success(function() {});
				});
				//console.log(user)
				return user;
			});
	}

	else if(user == 'tom'){

		var tom = models.User.build({username: 'Tom', color:"#c3c9eb", password: "tom", email:"homeof@gmail.com"}).save().success(function(tom) {
 /*
			var uma = models.Objectmeta.build({meta_key:'has_bitwallet', meta_value: true}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
		
			var uma = models.Objectmeta.build({meta_key:'has_lab', meta_value: true}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
*/
			var uma = models.Objectmeta.build({meta_key:'has_earlyadopter', meta_value: true}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			var uma = models.Objectmeta.build({meta_key:'profile_image', meta_value: 'img/users/tom-retro.jpg'}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			var uma = models.Objectmeta.build({meta_key:'current_place_city', meta_value: 'Paris'}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			var uma = models.Objectmeta.build({meta_key:'current_place_country', meta_value: 'France'}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			var uma = models.Objectmeta.build({meta_key:'short_bio', meta_value: 'my short bio here'}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			var uma = models.Objectmeta.build({meta_key:'website_url', meta_value: 'https://github.com/tomplays/'}).save().success(function(uma) {
					tom.addUsermeta(uma).success(function() {});
			});
			
			exports.user_give_rights(tom)
			exports.user_create_room('blou', tom);
	
			var room2 = models.Room.build({name: 'on the fly test newsroom' , slug: 'test-b', owners:tom.id }).save().success(function(room2) {
					//console.log('room2 created');
     				room2.addUser(tom).success(function() {	
						var user2 = models.User.build({username: 'toqsmb', password: "qsdqsdqsd", email:"homeof+rtrt@gmail.com"}).save().success(function(user2) {
							//console.log('user created');
     						room2.addUser(user2).success(function() {
							});	
							
						});


					});	
			});
		});

	}
}

exports.build_kindofdoc = function(){

	var kinds = new Array(
		[{name:'doc_text', slug: 'doc_text', description: 'doc_text'}],
	    [{name:'people', slug: 'people', description: 'people'}],
	    [{name:'media_img', slug: 'media_img', description: 'media_img'}],
	    [{name:'translation', slug: 'translation', description: 'translation'}]
	);
	_.each(kinds, function(kind,i){	
		var kind = kind[0];
		var defautkindofdoc = models.Kindofdoc.build({name:kind.name, slug: kind.slug, description:kind.description}).save().success(function(defautkindofdoc){
			
		});	
	});
	console.log('defaut kindofdoc fILLED');
}

// tags creation
exports.foootags = function(){	
	
	// Following functions create docs "fixtures" for texts, users, roles and caps, rooms, comments, nodes, etc...
	var foo_nodes = new Array(
		[{name:'Tests', slug: 'tests', taxonomy: 'self', bgimage: baseuse_url+'/img/lorem/400-400.jpg', baseline: '+'}],
		[{name:'blou', slug: 'blou', taxonomy: 'self', bgimage: '-', baseline: '-'}],
		[{name:'placeholder', slug: 'placeholder', taxonomy: 'self', bgimage: '-', baseline: '-'}],
		[{name:'musicbox', slug: 'musicbox', taxonomy: 'self', bgimage: '-', baseline: '-'}],
		[{name:'lorem-ipsum', slug: 'lorem-ipsum', taxonomy: 'self', bgimage: '-', baseline: '-'}],
		[{name:'Fact-checking', slug: 'fact-checking', taxonomy: 'self', bgimage: '-', baseline: '-'}]	
	);
	
	_.each(foo_nodes, function(node){
			//var node = node[0];
			var newnode = models.Node.build({ name: node.name , slug: node.slug , taxonomy:node.taxonomy, objectcount:1 }).save().success(function(newnode) {
				/*
				models.Nodemeta.build({meta_key: 'background_image',meta_value: node.bgimage}).save().success(function(nodemeta) {
					nodemeta.setNode(newnode).success(function() {});
					newnode.addTr(nodemeta).success(function() {});
	      		});
				models.Nodemeta.build({meta_key: 'baseline',meta_value: node.baseline}).save().success(function(nodemeta) {
					nodemeta.setNode(newnode).success(function() {});
					newnode.addTr(nodemeta).success(function() {});
	      		});
			 */	
		});

	});	

}
// util
exports.makesecret = function (len){
    var text = "";
    var possible = "bloublouDFGIJKMNOPQ!-)#@&%$*RSVWXYZ0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/*main*/
exports.create = function(){	
		//var tags 		= exports.foootags()
		var kindofdoc 	= exports.build_kindofdoc();
		var user_sys 	= exports.build_a_user('user_sys');
		var tom  		= exports.build_a_user('tom');
		console.log('</fixtures>');
		
}