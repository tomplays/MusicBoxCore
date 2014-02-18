var models = require('./models'),
apiroutes = require('./routes/api'),
docroutes = require('./routes/doc'),
userroutes  = require('./routes/user'),
nconf = require('nconf');

var inheriting = { };

/* for developpers include here: var labroutes = require('./routes/lab'); */


	
module.exports = function(app) {
        app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    	// res.header("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accep$
  		// res.header("Access-Control-Allow-Credentials", true);
   		// res.header("Access-Control-Max-Age","86400"); // 24 hours
 		//   res.writeHead(200, headers);
		//    res.next();
        next();
        });

	
	/*############################  APIS V1.0 ############################*/

	/* DOC */
	app.get('/apis/doc/:id/:static?', 								docroutes.one_doc_full); // post root node infos

	app.post('/apis/doc_create', 									docroutes.create_doc); // post root node infos
	app.post('/apis/doc/:docid/edit/:field/:value', 				docroutes.edit_doc_infos); // post root node infos
	// app.get('/apis/doc/clone/:id',								docroutes.doc_clone); // clone a doc 

	app.get('/apis/docs', 											docroutes.docs);
	app.get('/apis/docs/where/:where/:wherevalue', 					docroutes.docs_where);
	app.get('/apis/docs/kind/list', 								apiroutes.index_docs_kinds_list); // internal use

	/* TEXTDATAS */
	app.get('/apis/textdata/:docid',								apiroutes.textdatas); // 
	app.post('/apis/textdata/:docid/create',						apiroutes.create_textdata); 
	app.post('/apis/textdata/update',								apiroutes.update_textdata); 
	app.post('/apis/textdata/update_multi',							apiroutes.update_textdata_multi); 


	app.post('/apis/textdata/:docid/:textdataid/delete',			apiroutes.delete_textdata);
	app.post('/apis/findtarget',									apiroutes.extdoc_textdata_find_target);
	app.get('/apis/reftextdata/:docid/find',					    apiroutes.extdoc_textdata_find);
	app.get('/apis/reftextdata/:docid/:textdataid/:docidtarget',    apiroutes.extdoc_textdata);
	
	// test dockey (angular callback/save using doc.secret)
	app.post('/apis/testkey',										apiroutes.test_key); 

	// taxonomy 
	app.get('/apis/nodes/list/flat',								apiroutes.nodes_flat_list); 
	app.get('/apis/node/:nodename',									apiroutes.nodeinfos); 
	app.get('/apis/nodes/:docid',									docroutes.docnodes); // for a doc (maybe useless cause included in doc complete)

	// DOCMETAS
	app.get ('/apis/docmetas/:docid',								apiroutes.docmetas);
	app.post('/apis/docmetas/:docid/create',						apiroutes.create_docmeta); 
	app.post('/apis/docmetas/update',								apiroutes.update_docmeta); 
	app.post('/apis/docmetas/:docid/:docmetaid/delete',				apiroutes.delete_docmeta);
	
	// LOGS
	app.get('/apis/doclogs/:docid', 								apiroutes.doclogs); 
	app.post('/apis/doclogs/:docid/create',							apiroutes.create_doclog); 	// CURl : curl --data  "doclog[text]=my text&doclog[verb]=og_obj&doclog[subject]=log_obj&doclog[author]=tom" http://localhost:3000/apis/doclogs/1/create

	// "Global" DOCCOMMENTS
	//app.post('/apis/doccomments/:docid/create',						apiroutes.create_doccomment); // CURl : curl --data  "doccomment[text]=my text" http://localhost:3000/apis/doccomments/1/create
	//app.get('/apis/comments/:docid/status/:status', 				apiroutes.doccomments); 
	// app.get('/apis/comment/:commentid/:action/:value/:adminkey', 	apiroutes.update_doccomment); // hardcoded with pass #todo

	//USER (no CRUD/API yet)
 	app.get('/apis/profile/:username_or_id/:static?', 				userroutes.apiprofile); // public
	

	app.get('*'	, function(req, res){
		 res.send('<!DOCTYPE html><html><head><!-- /-) !--> <title> '+nconf.get('API_NAME')+'</title></head><body>'+ nconf.get('API_NAME')+' /index -  running /node : load_'+nconf.get('DATABASE_DOCSAPI_MODE')+' dialect_'+nconf.get('DATABASE_DIALECT')+ ' - <a href="https://github.com/tomplays/MusicBoxCore"> Doc and source @ Github </a></body></html>');

	});
}