'use strict';



var mongoose = require('mongoose'),
 _ = require('underscore'),
Article = mongoose.model('Article')

exports.list = function(req, res) {
    res.send('hello docs')
};



exports.docByIdOrTitle = function(req, res) {


	
	var query = Article.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) return handleError(err);
	  res.json(doc)

	})
}

exports.offset_td = function(req, res) {

var ar = new Object({'title':'bloue'})
    var article = new Article(ar);
   

    article.save(function(err) {
        if (err) {
            console.log('err')
        } else {
             console.log(article)
        }
    });
	

	// /api/v1/doc/:doc_id_or_title/textdatas/offset/:side/:start/:end/:qty

	var query = Article.findOne({ 'title':req.params.doc_id_or_title });
	// selecting the `name` and `occupation` fields
	//query.select('name occupation');
	// execute the query at a later time
	query.exec(function (err, doc) {
	  if (err) {
	  	return handleError(err);
	  }
	  else{


	  	_.each(doc.textdatas, function (td, i){
		       //if(td.end < 1){

		      // 	if( (td.start <= req.params.start )  ){

					if(req.params.side && req.params.side == 'left'){
						doc.textdatas[i].end = doc.textdatas[i].end + req.params.qty;
		       			doc.textdatas[i].start   =   doc.textdatas[i].start + req.params.qty;
		       		}
		       		else{
		       			doc.textdatas[i].end = doc.textdatas[i].end - req.params.qty;
		       			doc.textdatas[i].start = doc.textdatas[i].start - req.params.qty;

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
						    res.json(doc.textdatas)
						  }
					});

	  

	  }
	  

	  
	})


}









exports.docByIdOrTitle__ = function(req, res) {
   


	if(req.params.doc_id_or_title){
var query  =  Article.where({ title: req.params.doc_id_or_title });


 query.findOne(function(err, article) {
        if (err){

         return handleError(err);
        }
        else{


        	if(article){
        		  res.json(article)
        		//article.textdatas.push({ start: 5 , end:12});
        		//article.textdatas.push({ start: 10 , end:100});
        	
					_.each(article.textdatas, function (td, i){
		        		if(td.end < 1){
		        			td.end++;
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

