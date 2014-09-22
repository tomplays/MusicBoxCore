'use strict';


var index = require('../api/controllers/index.js');
var docs = require('../api/controllers/documents.js');



module.exports = function(app) {

    //Home 
   
    app.get('/', index.render);
    app.get('/api/v1/docs', docs.list);

    //a single doc record
    app.get('/api/v1/doc/:doc_id_or_title', docs.docByIdOrTitle);


    app.get('/api/v1/doc/:doc_id_or_title/textdatas/offset/:side/:start/:end/:qty', docs.offset_td);



};