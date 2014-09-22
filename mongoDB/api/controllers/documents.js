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



exports.offset_td = function(req, res) {




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


	  	_.each(doc.markups, function (td, i){
		       //if(td.end < 1){

		      // 	if( (td.start <= req.params.start )  ){

					if(req.params.side && req.params.side == 'left'){
						doc.markups[i].end = doc.markups[i].end + req.params.qty;
		       			doc.markups[i].start   =   doc.markups[i].start + req.params.qty;
		       		}
		       		else{
		       			doc.markups[i].end = doc.markups[i].end - req.params.qty;
		       			doc.markups[i].start = doc.markups[i].start - req.params.qty;

		       		}


		   //    	}
		       		



		       		
		       // }
		});
		doc.save(function (err,article) {
						 if (err) {
						 	res.send(err)
						 }
						  else{
						  	 console.log('Success!');
						    res.json(doc.markups)
						  }
					});

	  

	  }
	  

	  
	})


}









exports.docByIdOrTitle__ = function(req, res) {
   


	if(req.params.doc_id_or_title){
var query  =  Document.where({ title: req.params.doc_id_or_title });


 query.findOne(function(err, article) {
        if (err){

         return handleError(err);
        }
        else{


        	if(article){
        		  res.json(article)
        		//article.textdatas.push({ start: 5 , end:12});
        		//article.textdatas.push({ start: 10 , end:100});
        	
					_.each(article.markups, function (mk, i){
		        		if(mk.end < 1){
		        			mk.end++;
		        		}
		        	});

					/*

					article.save(function (err,article) {
						 if (err) {
						 	res.send(err)
						 }
						  else{
						  	 console.log('Success!');
						   
						  }
					});

					*/





        	}
        	


			

			// {$push: {readings: req.params.customer_reading}},




        	//console.log(article)
        }
    });




	}
	else{
		 res.send('provide doc id or title')

	}
	
	return;

};





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

