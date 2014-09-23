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
    app.get('/api/v1/doc/:doc_id_or_title/markups/offset/:side/:start/:end/:qty', docs.markup_offset);
    app.get('/api/v1/doc/:doc_id_or_title/markups/push/:type/:subtype/:start/:end/:position/:metadata/:status/:depth', docs.markup_create);




    app.get('/api/v1/doc/createnew/auto', docs.autocreatedoc);


};