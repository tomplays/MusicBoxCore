'use strict';


var index = require('../api/controllers/index');
var docs = require('../api/controllers/documents');
var users = require('../api/controllers/users');



module.exports = function(app, passport, auth) {


	// USER

    app.get('/signout', users.signout);
  //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'publish_stream'],
        failureRedirect: '/'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }), users.authCallback);

   
    //Finish with setting up the username param
    //app.param('username', users.userByName);
    app.param('userId', users.userById);

    //Home 
   


    /* with view */
    app.get('/',                            docs.docByIdOrTitleRender);
    app.get('/docs',                        docs.listRender);
    app.get('/docs/:list?',                 docs.listRender);
  	app.get('/doc/:doc_id_or_title',        docs.docByIdOrTitleRender);
    app.get('/partials/:name/:param?',      index.partial); // document, lists, etc..
   

    app.get('/fragments/:name/:param?',     index.fragments); // load sub-blocks 
    app.get('/doc/fragments/:name/:param?',  index.fragments); // load sub-blocks 


    app.get('/api/v1/docs', docs.list);

    //a single doc record
    app.get('/api/v1/doc/:doc_id_or_title', docs.docByIdOrTitle);




    // Main api feature : handle massive markups update
    // all mk in range
    app.get('/api/v1/doc/:doc_id_or_title/markups/offset/:side/:start/:end/:qty', docs.markups_offset);
    
    // single mk 
    app.get('/api/v1/doc/:doc_id_or_title/markup/:markup_id/offset/:side/:start/:end/:qty', docs.markup_offset);

     app.post('/api/v1/doc/:doc_id_or_title/markup/:markup_id/edit', docs.markup_edit);


	///http://localhost:3002/api/v1/doc/bloue0.5813338349107653/markups/push/type/subtype/0/3/position/metadata/status/1
    app.get('/api/v1/doc/:doc_id_or_title/markups/push/:type/:subtype/:start/:end/:position/:metadata/:status/:depth', docs.markup_create);
    app.post('/api/v1/doc/:doc_id_or_title/markups/push', docs.markup_create);


    app.get('/api/v1/doc/:doc_id_or_title/markups/delete/:markup_id', docs.markup_delete);
   // app.post('/api/v1/doc/:doc_id_or_title/markups/delete/' , docs.markup_delete);




	var fileupload = require('fileupload').createFileUpload('public/uploads').middleware;

 	// curl -F "userid=1" -F "filecomment=This is an image file" -Fe=@/Users/tom/Qs.txt" localhost/upload
	app.post('/upload', fileupload, function(req, res) {
	   res.send(req.body.image)
	 })
	 
    app.get('/api/v1/doc/createnew/auto', docs.autocreatedoc);
    app.get('/sockets/list', index.sockets_list);



};