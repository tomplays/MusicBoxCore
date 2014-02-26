var models 	= require("../models"),
_ 			= require('underscore'),
inheriting  = { },
nconf 		= require('nconf');


/* CRUD FOR :
	// TEXTDATA 
		*textdata
	// METADATA
		*metadata
	
	// DOCLOG
		*doclog

		* (+s) = (SELECT ALL ) GET
		create_* POST&GET
		update_* POST
		delete_* GET



// misc
// todo
*/



exports.create_textdata = function (req, res) {
	var out = new Object();

	if( nconf.get('DATABASE_INSERT_MODE') == 'comments_only' ){
		
	 	if(req.body.subtype && req.body.subtype !== 'comment'){
			out.status = 'comments_only insert mode'	
			res.send(out);
			return;
	 	}

	}

 	console.log(req.body)
	//var data = {'docid':docid,'start':partial_sentence_start , 'end':i, 'sentence': partial_sentence};
	var tdocid = tposition = tstart = tend = tmetadata = ttype = tcss= tsubtype = '';

	// FROM PARSED URL..
	var tdocid = req.params.docid;
	var tposition = req.body.position;
	var tstart = req.body.start;
	var tend = req.body.end;
	var tmetadata = req.body.metadata;
	var ttype = req.body.type
	var tcss = req.body.css;
	var tsubtype = req.body.subtype;


	
	var doc = models.Idoc.find({
	 	where: '"Idocs"."id"='+tdocid}).success(function(doc) {
		models.Textdata.build({position: tposition, css: tcss , metadata : tmetadata, type: ttype, subtype: tsubtype, start: tstart, end: tend}).save().success(function(textdata) {
			textdata.setTextdataer(doc);
			res.send(textdata);
			return;
		});
	});

 



}


// for cascading updates / first attempt
// using a list of TDs, 
// see https://github.com/tomplays/MusicBox/issues/1

// PARAMS : array(Textdatas {start, end , ID})
// RETURN : array(Textdatas {complete record})
// TODO   : dockeys and modes, , use promise


exports.update_textdata_massive  = function (req, res) {
		multi = req.body.list;
		var updated = new Array()
		_.each(req.body.list, function(td){
			var textdata = models.Textdata.find({
	 			where: {id:td.id}}).success(function(textdata) {
				if(textdata){
					textdata.start = td.start;
					textdata.end = td.end;
					textdata.save().success(function(textdata) {
		  				//res.send(textdata);
		  				updated.push(textdata);
					});
				}
				else{

				}
			});
		});
		console.log('upadting massive ('+_.size(multi)+') _td done')	
		res.send(updated);
		return;
}


exports.update_textdata  = function (req, res) {
	if( nconf.get('DATABASE_INSERT_MODE') == 'comments_only' ){
		var out = new Array();
		res.send(out);
		return

	}
	
	
	if(req.body.id){
		textdataid = req.body.id;
	}
	else{
		res.send('not body.id')
	}

	var textdata = models.Textdata.find({
	 	where: {id:textdataid}}).success(function(textdata) {







		if(textdata){
			console.log('upadting td')	
			
			if(req.body.css){textdata.css = req.body.css;}
     		if(req.body.metadata){textdata.metadata= req.body.metadata;}
     		if(req.body.type){textdata.type= req.body.type;}
     		if(req.body.subtype){textdata.subtype= req.body.subtype;}
     		if(req.body.start){textdata.start= parseInt(req.body.start);}
     		if(req.body.position){textdata.position= req.body.position;}
     		if(req.body.depth){textdata.depth= req.body.depth;}
     		if(req.body.ext_doc){textdata.ext_doc= req.body.ext_doc;}
     		if(req.body.end){textdata.end= parseInt(req.body.end);}

			textdata.save().success(function(textdata) {
  				res.send(textdata);
  				
			});

			console.log('textdata updated')
				

			}
			else{

				res.send('else/not saved td')
			}



			
  		});
}
exports.delete_textdata  = function (req, res) {
	var textdataid= req.params.textdataid;
	var docid = req.params.docid;
	var textdata = models.Textdata.find({
	 	where: {id:textdataid}}).success(function(textdata) {
	    	if(textdata){
				console.log('destroying:')
				console.log(textdata)
				textdata.destroy().success(function() {
				//reloads all...	
					var textdatar = models.Textdata.findAll(
						{where: {IdocId:docid}}).success(function(textdatar) {
							res.json(textdatar);
						});	
				});
			}
			else{
				res.send('else')
			}
	});
}


// SELECT ALL 
exports.textdatas = function (req, res) {
	var docid = req.params.docid;
	var textdatas = models.Textdata.findAll(
			{ where: { IdocId:docid }}
			).success(function(textdatas) {
				res.json(textdatas);
			});
}

// select externals relationship
exports.extdoc_textdata = function (req, res) {
	var textdataid= req.params.textdataid;
	var docidtarget= req.params.docidtarget;
	var doc = models.Idoc.find({
	 	where: '"Idocs"."id"='+docidtarget}).success(function(doc) {
	 		var textdata = models.Textdata.find(
			{ where: { id:textdataid }}
			).success(function(textdata) {
				textdata.setExtref(doc)
				res.json(textdata);
			});
	});
}
exports.extdoc_textdata_find = function (req, res) {
	var docid =  req.params.docid;
	var textdatas = models.Textdata.findAll(
			{ where: { IdocId:docid, type: 'img' }}
			).success(function(textdatas) {
				res.json(textdatas);
			});
}

exports.extdoc_textdata_find_target = function (req, res) {
	var source = req.body.metadata;


	var docmetas = models.Docmeta.findAll(
			{where: {meta_value: source,meta_key: 'media_url'}}
	).success(function(docmetas) {

			res.json(docmetas[0]);
	});





			
}

exports.docmetas = function (req, res) {
	var id = req.params.docid;
	var docmetas = models.Docmeta.findAll(
			{where: {IdocId:id}}
	).success(function(docmetas) {
			res.json(docmetas);
	});
}


exports.create_docmeta = function (req, res) {
 	
 	if( nconf.get('DATABASE_INSERT_MODE') == 'comments_only' ){
 		var out = new Array({meta_key: 'static mode', meta_value: 'static mode'});
		res.send(out);
		return
	}
	else{
		//console.log(req.body['id'])
		//console.log(req.body['data'])

		var id = req.params.docid;
		//var meta_key = 'kv';
		//var meta_value = 'kv';
		var meta_key = req.body.meta_key;
		var meta_value = req.body.meta_value;

		var doc = models.Idoc.find({
	 	where: '"Idocs"."id"='+id}).success(function(doc) {
			var docmeta = models.Docmeta.build({meta_key: meta_key,meta_value: meta_value }).save().success(function(docmeta) {
				docmeta.setDocmetaer(doc);
				res.send(docmeta);
			});
	});
	}

	
}
exports.update_docmeta = function (req, res) {
	console.log('trying to update docmeta');
	var out = new Object();

	

	if(!req.body.key || !req.body.id || !req.body.meta_key || !req.body.meta_value){
		out.status ='missing fields, id || key || mk || mkv'
		res.send(out);

		return;
	}
	if( nconf.get('DATABASE_INSERT_MODE') == 'comments_only' ){
		out.status = 'comments insert only are allowed'
		res.send(out);
		return;
	}
	var docmetaid = req.body.id;
	var key = req.body.key;

	var docmeta = models.Docmeta.find({
	 	where: {id:docmetaid}}).success(function(docmeta) {
			//console.log(docmeta);
			/* sub loop for doc.secret*/
			console.log('doc'+docmeta.IdocId);
			var doc_id = docmeta.IdocId;
			var doc = models.Idoc.find(
				{where: {id:doc_id}}
			).success(function(doc) {
				if(doc){
					console.log('showing console doc.secret:'+doc.secret)
					if(doc.secret !== key ){
						out.status = 'secret not match'
						res.send(out);
						console.log('docsecret failed try'); // some control
						return;
					}
					else{
						console.log('saved')
						out.status = 'saved'
						docmeta.meta_key	 	=  req.body.meta_key;
						docmeta.meta_value 		=  req.body.meta_value;
						out.docmeta = docmeta;
						docmeta.save();
						
						res.send(out);
						return;
					}
				}
				else{
					 out.status = 'error doc query';
					res.send(out)
					return;
				}
			});
	});
}


exports.delete_docmeta = function (req, res) {
	var out = new Object();

	if(!req.body.key || !req.body.docmetaid || !req.body.docid){
		out.status ='missing fields, id || key'
		res.send(out);
		return;
	}

	if( nconf.get('DATABASE_INSERT_MODE') == 'comments_only' ){
		out.status ='comments_only'
		res.send(out);
		return;
	}


	var docmetaid = req.body.docmetaid;
	var docid = req.body.docid;

	// DK check 


	var docmeta = models.Docmeta.find({
	 	where: {id:docmetaid}}).success(function(docmeta) {
	 		if(docmeta){
	 			docmeta.destroy().success(function() {
				//reloads all...	
					var docmetar = models.Docmeta.findAll({where: {IdocId:docid}}).success(function(docmetar) {
						res.json(docmetar);
					});	
				})
	 		}
	 		else{
	 			out.status ='dm to destroy not found'
				res.send(out);
				return;
	 		}
			
  	
	
	});
}


exports.doclogs = function (req, res) {
	var docid = req.params.docid;
	var doclogs = models.Log.findAll({
	 	where: {IdocId:docid}}).success(function(doclogs) {
			res.json(doclogs);
	});
}

// to fix with real POST // todo
exports.create_doclog = function (req, res) {
	if(!req.body.docid || !req.body.object || !req.body.text || !req.body.subject || !req.body.verb || !req.body.author){
		res.send('missing  fields..');
		return;
	}
	var docid= req.body.docid;
	//var log_obj = req.body.doclog;
	var log_obj = {text: req.body.text, object: req.body.object,  verb: req.body.verb, subject: req.body.subject, author: req.body.author, IdocId:docid}
	var doc = models.Idoc.find({
	 	where: '"Idocs"."id"='+docid}).success(function(doc) {
			models.Log.build(log_obj).save().success(function(log) {
				doc.addDoclog(log);
				res.json(log);
			});	
	});	
}


//misc
exports.test_key= function (req, res) {
	// could need need antispam sys.
	console.log('testing keypass '+req.body.dockey)
	
	if(!req.body.docid){
		res.send('missing  docid');
		return;
	}
	var doc_id = req.body.docid;


	var doc = models.Idoc.find(
		{where: {id:doc_id}}
	).success(function(doc) {
		console.log('(debug visible dockey !):'+doc.secret)
		
		if(req.body.dockey && ( 
						(req.body.dockey == nconf.get('CREATE_DOC_KEYPASS'))
							||
						(req.body.dockey == doc.secret ) 
							  )  
			){
			
			console.log('key is correct !');
			res.send('correct key');
		}
		else{
			res.send('wrong key');
		}
	});
}

// todo
exports.update_doclog = function (req, res) {}
exports.delete_doclog = function (req, res) {}


// internal listing (like forms <select>)

exports.index_docs_kinds_list = function (req, res) {
	var kinds_list = new Array();
	var kinds_list = models.Kindofdoc.findAll().success(function(kinds_list) {
		//_.each(nodes, function(node,i){});
		res.json(kinds_list);				
	});

};

exports.nodes_flat_list = function (req, res) {
	var out_nodes = new Array();
	var nodes = models.Node.findAll({order: 'objectcount DESC',  include: [{ model: models.Nodemeta, as: 'Tr' },{ model: models.Idoc, as: 'Idocs' }] }).success(function(nodes) {
		_.each(nodes, function(node,i){	
				nodes[i]= new Object({root:nodes[i] ,  background_image:'', baseline:''});	
				 _.each(node.tr, function(tr){
					if(tr.meta_key== 'background_image'){	
						nodes[i].background_image= tr.meta_value;
					}
					if(tr.meta_key== 'nodecolor'){	
						nodes[i].nodecolor= tr.meta_value;
					}
					if(tr.meta_key== 'baseline'){
						nodes[i].baseline= tr.meta_value;
					}		
				});
 				// _.each(node.Idocs, function(Idoc){});
		});
		res.json(nodes);				
	});
};


/*
 desc : node basic infos, nodemeta and docs associated to it.
 api_url  : /apis/node/:nodename
 params : :nodename
 output: json
*/
exports.nodeinfos = function (req, res) {
	var node_infos = {};
	var nodename= req.params.nodename;
	var node = models.Node.find({
	 	where: {slug:nodename }}).success(function(node) {
		    if(node){
				res.json(node);
				/*	node_infos.node = node;
					node.getTr().success(function(metas) {
						node_infos.metas = metas;
						node.getIdocs().success(function(docs) {
							node_infos.docs = docs;
							res.json(node_infos);
						});
					});
				*/
				}
			else{
				res.json('null');
			}	
	});
};


