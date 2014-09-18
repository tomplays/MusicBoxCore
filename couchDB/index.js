 var cradle = require('cradle');
 var db = new(cradle.Connection)().database('docs');


//db.create();
 db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      db.create();
      /* populate design documents */
    }
  });

  db.get('3f5ce573cd90657823d0e8c16300137f', function (err, doc) {


  //if (doc.value) {
//    emit([doc.value, 0], null);
    if (doc.textdatas) {
	console.log(doc.textdatas)     
	 for (var i in doc.textdatas) {
         //emit([textdatas.value, Number(i)+1], {_id: doc.textadatas[i]});
	emit( {_id: doc.textdatas[i]})      		
console.log(i)
	}
    }
 // }

//     console.log(doc)
	//doc.name; // 'Darth Vader'
      // assert.equal(doc.force, 'dark');
  });


/*
db.view('docs/all', function (err, res) {
      res.forEach(function (row) {
          console.log(row);
      });
  });
*/
