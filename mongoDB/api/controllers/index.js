'use strict';


exports.render = function(req, res) {



	
    res.render('index_v1');
};

exports.partial = function (req, res) {
  var name = req.params.name;
  var extraparam = '';
  if(req.params.param){ var extraparam = req.params.param; }
	res.render('partials/' + name , {
	  locals: {
             title: name,
             extraparam: extraparam
		}
  });
};