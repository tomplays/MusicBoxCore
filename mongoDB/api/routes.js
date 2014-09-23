'use strict';


var index = require('../api/controllers/index.js');
var docs = require('../api/controllers/documents.js');



module.exports = function(app) {

    //Home 
   

    /* with view */
    app.get('/', docs.docByIdOrTitleRender);
    app.get('/docs', docs.listRender);
    app.get('/docs/:list?', docs.listRender);
  	app.get('/doc/:doc_id_or_title', docs.docByIdOrTitleRender);
    app.get('/partials/:name/:param?', index.partial);




    app.get('/api/v1/docs', docs.list);

    //a single doc record
    app.get('/api/v1/doc/:doc_id_or_title', docs.docByIdOrTitle);




    // Main api feature : handle massive markups update
    // all mk in range
    app.get('/api/v1/doc/:doc_id_or_title/markups/offset/:side/:start/:end/:qty', docs.markups_offset);
    
    // single mk 
    app.get('/api/v1/doc/:doc_id_or_title/markup/:markup_id/offset/:side/:start/:end/:qty', docs.markup_offset);


	///http://localhost:3002/api/v1/doc/bloue0.5813338349107653/markups/push/type/subtype/0/3/position/metadata/status/1
    app.get('/api/v1/doc/:doc_id_or_title/markups/push/:type/:subtype/:start/:end/:position/:metadata/:status/:depth', docs.markup_create);
    app.post('/api/v1/doc/:doc_id_or_title/markups/push', docs.markup_create);


    app.get('/api/v1/doc/:doc_id_or_title/markups/delete/:markup_id', docs.markup_delete);
    app.post('/api/v1/doc/:doc_id_or_title/markups/delete/' , docs.markup_delete);





    app.get('/api/v1/doc/createnew/auto', docs.autocreatedoc);


};