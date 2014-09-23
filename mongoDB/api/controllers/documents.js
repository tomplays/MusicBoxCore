'use strict';



var mongoose = require('mongoose'),
 _ = require('underscore'),
Document = mongoose.model('Document')

exports.list = function(req, res) {
	var query = Document.find();
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, docs) {
	  if (err) return handleError(err);
	  res.json(docs)

	})
   
};
exports.listRender = function(req, res) {
	var query = Document.find();
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, docs) {
		console.log(docs)
	  if (err) return handleError(err);
	  //res.json(docs)
	  docs = JSON.stringify(docs)
		res.render('index_v1', {
	 		
             docs: docs
		
 		 });
	})
   
};

exports.autocreatedoc = function(req, res){

	var ar = new Object({'title':'bloue'+Math.random()})
	ar.markups = new Array()
	var markup  = new Object( {'start':0, 'end':0} )
	ar.markups.push(markup)
    var doc = new Document(ar);
   

    doc.save(function(err,doc) {
        if (err) {
            return handleError(err);
        } else {
             res.json(doc)
        }
    });


}


exports.docByIdOrTitle = function(req, res) {


	
	var query = Document.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) return handleError(err);
	  res.json(doc)

	})
}

exports.docByIdOrTitleRender = function(req, res) {


	if(!req.params.doc_id_or_title){
		var doc_id_or_title  = 'bloue0.6898315178696066';
	}
	else{
		var doc_id_or_title  = req.params.doc_id_or_title;
	}
	var query = Document.findOne({ 'title':doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) {
	  	return handleError(err);
	  }
	  	
	  	doc = JSON.stringify(doc)

	  	console.log(doc)
		res.render('index_v1', {
	 		
             doc: doc
		
  });
	  	
	  	


	})
}


// /api/v1/doc/:doc_id_or_title/markups/create/:type/:subtype/:start/:end/:position/:metadata/:status/:depth
exports.markup_create = function(req, res) {
	var query = Document.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) {
	  	res.send(err)
	  }
	  else{
			var markup  = new Object( {'position': req.params.position, 'start':req.params.start, 'end':req.params.end, 'subtype': req.params.subtype, 'type': req.params.type, 'status': req.params.status, 'metadata': req.params.metadata, 'depth': req.params.depth} )
			doc.markups.push(markup)
			doc.save(function(err,doc) {
			        if (err) {
			          res.send(err)
			        } else {
			             res.json(doc)
			        }
			 	});

	  }
	});
}
// /api/v1/doc/:doc_id_or_title/markups/delete/:markup_id

exports.markup_delete = function(req, res) {
	var query = Document.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) {
	  	res.send(err)
	  }
	  else{

	  		if(req.params.markup_id && req.params.markup_id == 'all'){
				doc.markups = new Array();
	  		}
			else{
				console.log(req.params.markup_id)
				var found = new Array();
				 _.each(doc.markups, function (m, i){
			       if(m._id == req.params.markup_id){
			       	console.log('remove'+i)
			       	found = m
			       }
			      });

			 	doc.markups = _.without(doc.markups,found );
			}


			// both case save
			doc.save(function(err,doc) {
			        if (err) {
			           res.send(err)
			        } else {
			             res.json(doc)
			        }
			 	});
	  }
	});
}

exports.markup_offset= function(req, res) {
	//todo
	res.send('ok')
}

exports.markups_offset = function(req, res) {
	// /api/v1/doc/:doc_id_or_title/markups/offset/:side/:start/:end/:qty
	var query = Document.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) {
	  	return handleError(err);
	  }
	  else{
	  	var qty = parseInt(req.params.qty)
	  	_.each(doc.markups, function (td, i){
		    
		      //if( (td.start <= req.params.start )  ){
					if(req.params.side && req.params.side == 'left'){
						doc.markups[i].end 		= 	parseInt(doc.markups[i].end) + qty;
		       			doc.markups[i].start    =   parseInt(doc.markups[i].start) + qty;
		       		}
		       		else{
		       			doc.markups[i].end 		= parseInt(doc.markups[i].end) - qty;
		       			doc.markups[i].start 	= parseInt(doc.markups[i].start) - qty;
		       		}
		  	 //}
		});
		doc.save(function (err,article) {
						 if (err) {
						 	res.send(err)
						 }
						  else{
						  	// console.log('Success!');
						    res.json(doc)
						  }
					});
	  }
	})
}

/*
Contact.findByIdAndUpdate(
    info._id,
    {$push: {"messages": {title: title, msg: msg}}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
);


*/

