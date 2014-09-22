'use strict';


var index = require('../api/controllers/index.js');
var docs = require('../api/controllers/documents.js');



module.exports = function(app) {

    //Home 
   
    app.get('/', docs.docByIdOrTitleRender);

  	app.get('/doc/:doc_id_or_title', docs.docByIdOrTitleRender);


    app.get('/partials/:name/:param?', index.partial);




    app.get('/api/v1/docs', docs.list);

    //a single doc record
    app.get('/api/v1/doc/:doc_id_or_title', docs.docByIdOrTitle);




    // Main api feature : handle massive markups update
    app.get('/api/v1/doc/:doc_id_or_title/markups/offset/:side/:start/:end/:qty', docs.offset_td);

    app.get('/api/v1/doc/create/auto', docs.autocreatedoc);


};