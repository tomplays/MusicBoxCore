/*
> connects to database (sequelize / postgres)
> load models as database objects and relationships (for users, rooms, documents, ....)
> load drop/fixtures (dbinint)
*/

var	nconf = require('nconf');
Sequelize = require("sequelize");


// see sequelize documentation
var  sequelize= new Sequelize( 
					nconf.get('DATABASE_NAME'), 
					nconf.get('DATABASE_USERNAME'), 
					nconf.get('DATABASE_PASSWORD'),
					{
						host: 		nconf.get('DATABASE_HOST'),
						port: 		nconf.get('DATABASE_PORT'),
						dialect: 	nconf.get('DATABASE_DIALECT'),
						logging:    false,
					}
				);

/* Loading models from files, see /models folder */ 

var User 		= sequelize.import(__dirname + "/models/user.js");
var Room 	    = sequelize.import(__dirname + "/models/room.js");
var Idoc		= sequelize.import(__dirname + "/models/idoc.js");
var Docmeta		= sequelize.import(__dirname + "/models/docmeta.js");
var Textdata	= sequelize.import(__dirname + "/models/textdata.js");
var Comment	    = sequelize.import(__dirname + "/models/comment.js");

// used for user options (profile extend) 
var Objectmeta  = sequelize.import(__dirname + "/models/objectmeta.js");

// log actions in room // doc // etc..
var Log	    	= sequelize.import(__dirname + "/models/log.js");

// like tags..
var Node 		= sequelize.import(__dirname + "/models/node.js");
	// should use objectmeta instead
	var Nodemeta 	= sequelize.import(__dirname + "/models/nodemeta.js");

// for rights and permissions (ACL)
var Process 	= sequelize.import(__dirname + "/models/process.js");
var Role 		= sequelize.import(__dirname + "/models/role.js");
// internal use //  doc use
var Kindofdoc	= sequelize.import(__dirname + "/models/kindofdoc.js");


// depreciated.. 
//	var Page 	    = sequelize.import(__dirname + "/models/page.js");
//  var Subscriber	= sequelize.import(__dirname + "/models/subscriber.js");


// Database Objects dependance / relationships

// see sequelize documentation

// define models relationships 

Idoc.hasMany(Docmeta, {as: 'Docmetas'});
Docmeta.belongsTo(Idoc, { as: 'Docmetaer' });

User.hasMany(Objectmeta, {as: 'Usermetas'});
Objectmeta.belongsTo(User, { as: 'Usermeta' });

Idoc.hasMany(Textdata, {as: 'Textdatas'});

Idoc.hasMany(Idoc, { as: 'Parent', foreignKey: 'idoc_id', joinTableName: 'IdocsParents' });
Idoc.hasMany(Idoc, { as: 'Child', foreignKey: 'idoc_id', joinTableName: 'IdocsChilds' });

Textdata.belongsTo(Idoc, { as: 'Textdataer' });
Textdata.belongsTo(Idoc, { as: 'Extref',  foreignKey: 'ext_doc' });

Idoc.hasMany(Comment, {as: 'Comments'});


Comment.belongsTo(User, { as: 'Commenter' });
Comment.belongsTo(Idoc, { as: 'Comments' });

User.hasMany(Comment, {as: 'Comments'});

Idoc.hasMany(Log, {as: 'Doclogs'});
Log.belongsTo(Idoc, { as: 'Doclogs' });

Node.hasMany(Idoc, { as: 'Idocs', foreignKey: 'node_id', joinTableName: 'NodeIdocs' });
Idoc.hasMany(Node, { as: 'Nodes', foreignKey: 'idoc_id', joinTableName: 'NodeIdocs' });

Node.hasMany(Nodemeta, { as: 'Tr', joinTableName: 'NodeMetas' });
Nodemeta.belongsTo(Node, { as: 'Node', joinTableName: 'NodeMetas' });

User.hasMany(Room, { as: 'Rooms', foreignKey: 'user_id', joinTableName: 'UserRooms' });
Room.hasMany(User, { as: 'Users', foreignKey: 'room_id', joinTableName: 'UserRooms' });

Room.hasMany(Process, {as: 'Processes'});
Idoc.hasMany(Process, { as: 'Processes'});

Process.belongsTo(Room, { as: 'Processes' });
Process.belongsTo(Idoc, { as: 'Processes' });

User.hasMany(Role, { as: 'Roles'});
Room.hasMany(Role, { as: 'Roles'});
Idoc.hasMany(Role, { as: 'Roles'});
Process.hasMany(Role, { as: 'Roles'});

Room.hasMany(Idoc, { as: 'Idocs' });
Idoc.belongsTo(Room, { as: 'Rooms' });

User.hasMany(Idoc, { as: 'Idocs' });

Idoc.hasMany(User, {as:'Creators'});
Idoc.hasMany(User, {as:'Editors'});
Idoc.hasMany(User, {as:'Owners'});
Idoc.hasMany(User, {as:'Elsemakers'});

Room.hasMany(Objectmeta, { as: 'Objectmetas' });
Objectmeta.belongsTo(Room, { as: 'Rooms' });

Room.hasMany(Log, {as: 'Roomlogs'});
Log.belongsTo(Room, { as: 'Roomlogs' });

//Room.hasMany(Page, { as: 'Pages' });
//Page.belongsTo(Room, { as: 'Rooms' });



module.exports = {
    Sequelize		: sequelize,
	User			: User,
	/*Page			: Page,*/
	Textdata		: Textdata,
	Idoc	    	: Idoc,
	Docmeta	    	: Docmeta,
	Comment	    	: Comment,
	Log    			: Log,
	Node 			: Node,
	Nodemeta 		: Nodemeta,
	Room	 		: Room,
	Process			: Process,
	Role			: Role,
	Objectmeta		: Objectmeta,
	/* Subscriber	: Subscriber, */
	Kindofdoc		: Kindofdoc
}

var fixtures = require("./models/dbinit");

// drop || fixtures sync. 
if ( nconf.get('fixtures')  ||  nconf.get('drop')){
	sequelize.sync()
	.success(function() {
		if (nconf.get('fixtures')){
			console.log("-- Syncing database with dbinit");
			fixtures.fooo();
		}
		if (nconf.get('drop')){
			console.log("-- Dropping database");
		 	sequelize.drop({force:true}).success(function() {console.log("-- Database empty");});
		}
	})
	.error(function(error) {
		console.log(error);
	});
}
else{
	sequelize.sync();
	console.log('ready');
}