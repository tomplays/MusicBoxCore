var models = require("../models"),
_ = require('underscore'),
nconf = require('nconf'),
bcrypt = require('bcrypt'),
fs = require('fs'),
jf = require('jsonfile');

var inheriting = { };

exports.docs = function (req, res) {
	/// not working for tests...
	var docs = models.Idoc.findAll({include:[models.Room, { model: models.Docmeta, as: 'Docmetas' }]
	} ).success(function(docs) {
			var docs_out = new Array()
			_.each(docs, function(doc, docs_i){
				doc.secret='hidden';
				docs_out.push(doc);
			});
			res.json(docs_out);
	});
}

exports.docs_where = function (req, res) {
	var where = req.params.where;
	var wherevalue = req.params.wherevalue;
	var docs_out = new Array();	

	if(where == 'kind'){
		var docs = models.Idoc.findAll({where: {kind:wherevalue}});
	}
	else if(where == 'ishome'){
		var docs = models.Idoc.findAll({where: {ishome:wherevalue}});	
	}
	else if(where == 'section'){
		var docs = models.Idoc.findAll({where: {section:wherevalue}});	
	}
	else if(where == 'status'){
		var docs = models.Idoc.findAll({where: {status:wherevalue}});
	}
	else if(where == 'id'){
		var docs = models.Idoc.findAll({  
					where: {'"Idocs"."id"':wherevalue} 
					//include:[{ model: models.Room, as: 'Rooms'}, { model: models.Idoc.Comment, as: 'Comments'},{ model: models.Docmeta, as: 'Docmetas' }, { model: models.Textdata, as: 'Textdatas'}]		
					 });
	}
	else{
		res.send('need a kind params');
		return;
	}
	docs.success(function(docs) {
		if(docs){
			var docs_out = new Array()
			_.each(docs, function(doc, docs_i){
			//	var docf = new Array();
			//	docf = exports.filter_doc(1); 
				docs_out.push(doc);
			});
			res.json(docs_out);
		}
		//
	});
}


exports.filter_doc = function (doce) {
var docs = models.Idoc.find({  
					where: {'"Idocs"."id"':doce} 
					//include:[{ model: models.Room, as: 'Rooms'}, { model: models.Idoc.Comment, as: 'Comments'},{ model: models.Docmeta, as: 'Docmetas' }, { model: models.Textdata, as: 'Textdatas'}]		
					 }).success(function(docs) {
						return docs;
					 });
						/*
						, 
						{ model: models.Room, as: 'Rooms' }, 
						{ model:models.Comment, as: 'Comments'},
						{ model: models.Docmeta, as: 'Docmetas' },
						{ model:models.Idoc.Doclogs, as: 'Doclogs'}
						doc.getDoclogs().success(function(doclogs) {
									doc.getDocmetas().success(function(docmetas) {	
										doc.getComments().success(function(comments) {
											doc.getProcesses().success(function(processes) {
												doc.getRoles().success(function(roles) {
													doc.getTextdatas().success(function(textdatas) {

						*/
}

exports.docnodes = function (req, res) {
 var docid = req.params.docid;
 var doc = models.Idoc.find({
	 	where: '"Idocs"."id"='+docid}).success(function(doc) {
			doc.getNodes().success(function(nodes) {
				res.json(nodes);
			});
		});
}

exports.edit_doc_infos = function (req, res) {
	//console.log('.edit_doc_infos req.body');
	//console.log(req.body)
	var doc_id = req.params.docid;
	var dockey= false;
	console.log('- Try to update doc #'+doc_id);
	var doc = models.Idoc.find(
		{where: {id:doc_id}}
	).success(function(doc) {
		console.log('(debug visible dockey !):'+doc.secret)
		// a && ( b|| c )
		if(req.body.dockey && ( 
						(req.body.dockey == nconf.get('CREATE_DOC_KEYPASS'))
							||
						(req.body.dockey == doc.secret ) 
							  )  
			){
			dockey = true;
			console.log('key is correct ! ');
			var field= req.body.field;
			var value = req.body.value;

			if(field == 'content'){
				doc.content= req.body.value;
			}
			else{
				doc[field] = value;
			}
			doc.save();
				models.Log.build({text: 'tom edited the ('+field+') with value '+value, verb: 'edit', subject: 'doc edit', author: 'tom'}).save().success(function(log) {
					    doc.addDoclog(log);
						var doc_infos = {};
						doc_infos.doc = doc;
						doc_infos.doc.secret = 'hidden';
						doc_infos.doclog = log;
						//console.log(doc_infos);
						res.send(doc_infos);
				});
		}
		else{
			console.log('user need key for doc edit!')
			res.send('need key for doc');
		}
		
	})


}

exports.docsetparent = function (req, res) {
	var docidparent = req.params.docidparent;
	var docidchild = req.params.docidchild;
	var docparent = models.Idoc.find(
		{where: {id:docidparent}}
	).success(function(docparent) {
			var docchild = models.Idoc.find(
				{where: {id:docidchild}}
			).success(function(docchild) {
				
				docchild.addParent(docparent);
			    docparent.addChild(docchild);
				
				res.json(docchild);
			});	
	});
}




exports.docgetparents = function (req, res) {
//	var docidparent = req.params.docidparent;
	var doc = req.params.doc;
	var docchild = models.Idoc.find(
		{where: {id:doc}}
	).success(function(doc) {
		doc.getParent().success(function(docParents) {
				res.json(docParents);	
		});
		/*	var docchild = models.Idoc.find(
				{where: {id:docidchild}}
			).success(function(docchild) {
				docparent.addParent(docchild);
			    docparent.addChild(docchild);
				res.json(docchild);
			});	
		*/
	});
}
exports.docgetchilds = function (req, res) {
//	var docidparent = req.params.docidparent;
	var doc = req.params.doc;
	var doc = models.Idoc.find(
		{where: {id:doc}}
	).success(function(doc) {
		
	
		doc.getChild().success(function(docChilds) {
				res.json(docChilds);
		});
		
		/*	var docchild = models.Idoc.find(
				{where: {id:docidchild}}
			).success(function(docchild) {
				docparent.addParent(docchild);
			    docparent.addChild(docchild);
				res.json(docchild);
			});	
		*/
	});
}

exports.makeid = function (len)
{
    var text = "";
    var possible = "blouBDFGIJKMNOPQRSVWXYZ0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// FROM API
exports.one_doc_full = function (req, res) {


if( (req.params.static && req.params.static == 'static' ) ||  (nconf.get('DATABASE_DOCSAPI_MODE') == 'static')  ){
	console.log('static file load')
	res.sendfile('public/statics/docs/'+req.params.id+'.json')
	return;
}
else{
	console.log('dynamic doc file load #'+req.params.id)

	var test_mode = 'user';
	var user_in = 1;
	var exit = false;
	var id = req.params.id; 
	var where_obj = {}	
	if(_.isFinite(id) ){ 
		where_obj.id = id;
	}
	else{
		where_obj.slug = id;
		
	}

    var doc = models.Idoc.find({where: where_obj}).success(function(doc) {



	 	if(doc){
	 		doc.secret = 'hidden';


			doc.getRooms().success(function(Room) {
				doc.getDoclogs().success(function(doclogs) {
					doc.getDocmetas().success(function(docmetas) {	
						doc.getComments().success(function(comments) {
							doc.getProcesses().success(function(processes) {
								doc.getRoles().success(function(roles) {
									doc.getNodes().success(function(nodes) {
										doc.getTextdatas(/*{ include: [{ model: models.Idoc.Docmetas, as: 'Extref' }] }*/).success(function(textdatas) {


											if(textdatas.ext_doc !==null){
												//////
											}
									//	doc.getCreator().success(function(Creator) {
									//		doc.getContributor().success(function(Contributor) {
												
												var my_roles = new Array();
												var doc_creator= new Array();
												var doc_editor= new Array();


												_.each(roles, function(role, idg){
													
													if(role.text=='doc_creator'){
														doc_creator.push(role.UserId);	
													}
													if(role.text=='doc_editor'){
														doc_editor.push(role.UserId);	
													}
													
													
													
													//	console.log(role);
													if(role.UserId == user_in){
														//console.log('role granted');
														my_roles.push(role)
													}
													else{
														//console.log('not role granted by id');
													}
												});
												var my_permissions = new Array();
								
												_.each(processes, function(process, idg){

													
														if((process.text == "view_doc") /* && (user_in ==1) */){
														 	//exit = true;
														    my_permissions.push(process.text)
															//return exit;
														}
											
									
												});
									
									
									
												var doc_infos = {};
												doc_infos.doc = doc;
												doc_infos.myroles_granted = my_permissions;
												doc_infos.textdatas = textdatas;
												doc_infos.roles = roles;
												doc_infos.comments= comments;
												doc_infos.logs = doclogs;
												doc_infos.processes = processes;
												doc_infos.docmetas =docmetas;
												doc_infos.nodes = nodes;
												doc_infos.room = Room;
												doc_infos.creator = doc_creator;
												doc_infos.editor = doc_editor;

												//doc_infos.contributor = Contributor;
												if(exit === false){

                                          		if(req.params.static && req.params.static == 'write'){               
													var file = './public/statics/docs/'+req.params.id+'.json';
	                                                jf.writeFile(file, doc_infos, function(err) {
	                                                  console.log(err);
	                                                  res.json(doc_infos);
	                                                });
                                            	}
                                            	else{
                                            		res.json(doc_infos);
                                            	}


													
												}
												else{
													res.send('all doc_infos exited');
												}
											//}); // contribs
										//}); // creator
									});
								});
								});//nodes
							});
						});
					});
				});
			}).error(function() {
	  			res.send('e2??');
			});
		} 
		else{
			console.log('522');
			res.send('Doc not found');
		}

	}).error(function() {
  		res.send('e1??');
	});

} // else static nconf
}


// CLONE a document from antoher.
// TODO : ROLES and PROCESS cloning.
exports.doc_clone = function (req, res) {

	//res.send(req.params.id);
	//var test_mode = 'user';
	//var user_in = 1;
	//var exit = false;
	
	var idc = req.params.id || false; 
    var doc = models.Idoc.find({
	 	where: { id: idc}} ).success(function(doc) {
		doc.getRooms().success(function(Room) {
			doc.getDoclogs().success(function(doclogs) {
				doc.getDocmetas().success(function(docmetas) {	
					doc.getComments().success(function(comments) {
						doc.getProcesses().success(function(processes) {
							doc.getRoles().success(function(roles) {
								doc.getTextdatas().success(function(textdatas) {
									var newdoc = models.Idoc.build({title:doc.title, content: doc.content, status: doc.status, section:doc.section , order:doc.order , kind: doc.kind, external : doc.external}).save().success(function(newdoc){
										Room.addIdoc(newdoc);
										models.Log.build({text: 'Somebody created a '+doc.kind+' as '+doc.status+' from a cloned document', verb: 'created', subject: doc.kind+' creation', author: 'tom'}).save().success(function(log) {
											newdoc.addDoclog(log);
										});	
										_.each(docmetas, function(docmeta, idg){
											models.Docmeta.build(docmeta).save().success(function(dc) {
												dc.setDocmetaer(newdoc);
											});	
										});
										_.each(comments, function(comment, idg){
											models.Comment.build(comment).save().success(function(c) {
												 newdoc.addComment(c); 
	     											/////// TODO ! c.setCommenter(user)
											});	
										});
										/*
										_.each(roles, function(role, idg){
											//models.Role.build(role).save().success(function(r) {
												
											//});	
										});
										*/
										// NOT COMPLETE 
										// USERID is Hardcoded.
										
										var rol33 = models.Role.build({text:'doc_creator', role:'owner', status: 'active', UserId:1 }).save().success(function(rol33) {
											//	pro2.addRole(rol33).success(function() { });
											//	user.addRole(rol33).success(function() { });
											Room.addRole(rol33).success(function() { });
											newdoc.addRole(rol33).success(function() { });
										});
										
										
										_.each(textdatas, function(textdata, idg){	
												models.Textdata.build(textdata).save().success(function(td) {
														td.setTextdataer(newdoc);
												});	
										});
										res.json(newdoc);
									});
											/*
											var my_roles = new Array();
											var doc_creator;
											_.each(roles, function(role, idg){
												
												if(role.text=='doc_creator'){
													doc_creator = role.UserId;	
												}
												
												
												
												//	console.log(role);
												if(role.UserId == user_in){
													//console.log('role granted');
													my_roles.push(role)
												}
												else{
													console.log('not role granted by id');
												}
											});
											var my_permissions = new Array();
							
											_.each(processes, function(process, idg){
													if((process.text == "view_doc") && (user_in ==2)){
													 	exit = true;
													    my_permissions.push(process)
														return exit;
													}
										
								
											});
								
								
								
											var doc_infos = {};
											doc_infos.doc = doc;
											doc_infos.myroles_granted = my_permissions;
											doc_infos.textdatas = textdatas;
											doc_infos.roles = roles;
											doc_infos.comments= comments;
											doc_infos.logs = doclogs;
											doc_infos.processes = processes;
											doc_infos.docmetas =docmetas;
											doc_infos.room = Room;
											doc_infos.creator = doc_creator;
											//doc_infos.contributor = Contributor;

								
											if(exit === false){
												res.json(doc_infos);
											}
											else{
												res.send('all doc_infos exited');
											*/
											//res.send('doc cloned');
									
								});
							});
						});
					});
				});
			});
		});
	});
};


exports.create_doc = function (req, res) {	
		//var salt = bcrypt.genSaltSync(4);
		//var hash = bcrypt.hashSync("abc", salt);
		hash = exports.makeid(7);
		console.log(req.body);
		var title = 'new doc';
		var content = 'new doc';
		var slug = hash;
		var kind='';
		var external='';
		var section='';
		var order='';
		var status='fresh';
		//var secret='';
		var RoomId = 1;
	if(req.body.title){
		title = req.body.title;
	}
	if(req.body.kind){kind = req.body.kind;}
	if(req.body.content){content = req.body.content;}
		var doc = models.Idoc.build({
			title: title, 
			slug: slug,
			content: content, 
			status: status, 
			section:section, 
			order: order, 
			kind: kind,
			RoomId: RoomId
			}).save().success(function(doc ){
				models.Log.build({text: 'new doc! ', verb: 'created', subject: 'doc creation', author: 'system_tom'}).save().success(function(log) {
					doc.addDoclog(log);
				});	

				models.Docmeta.build({meta_key: 'kind',meta_value: 'by_user' }).save().success(function(docmeta) {
					docmeta.setDocmetaer(doc);
				});
	
				res.send(doc);
		});
}


