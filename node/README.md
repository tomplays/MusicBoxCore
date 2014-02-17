## MusicBoxCore API /running node 
=================================

[![Build Status](https://travis-ci.org/tomplays/MusicBoxCore.png?branch=master)](https://travis-ci.org/tomplays/MusicBoxCore)

Node version of MusicBoxCore


## Technical Stack 

* Node server
* Express Routing
* Postgres Database <-> Sequelize mapping (http://www.sequelizejs.com/)


(tested running on a Debian, OSX)

## Quick Start


### Requirements

	* Node
	* Postgres


### Installation


`git clone https://github.com/tomplays/MusicBoxCore.git`

`cd MusicBoxCore/node`

`npm install` (maybe sudo for postgres)

`cp config_sample.json config.json`

`nano config.json` (..)


### Options

 	see config.json

### Run

`npm run-script start`

or 

`node app.js --drop`		drop

`node app.js --tags`		fill database with tags 

`node app.js --fixtures`	fill database using dbinit.js





## Directory Layout
    
    app.js                  --> app config/ top level
    package.json            --> for npm
    models.js               --> database models (sequelize)
	+ models/ (+ doc in files)
				dbinit.js
					"fixtures" for docs, rooms, users, used for tests, create all kind of models and possible relationships

				idoc.js
					document root data model

				docmeta.js
					document additionnal keys	
				
				log.js
					model for public actions logging 
				
				node.js
					"taxonomy" object data model
				
				nodemeta.js
					background, baseline, extra infos for nodes

				process.js
					what could users do ?
				
				role.js
					me ? can I or not
				
				room.js
					like a site, newsroom, media, blog, war-room,...

				textdata.js
					"Spécial" doc model, see doc "Boite à musique"

				user.js
					"standard" user model

    routes.js
    + routes/ (doc in files)
    		api.js
    		doc.js
    		user.js
    		lab.js
    public
    	statics 
    		docs
    			0-n.json
    		users
    			profile
    				0-n.json

    

    (no "views" folder)



## ROUTES

	see routes.js and routes/ files
	
	Dynamic examples
		* doc/s
		http://localhost:3001/apis/doc/1
		http://localhost:3001/apis/docs


	Static mode examples
		
		a. http://localhost:3001/apis/doc/1/write
		b. http://localhost:3001/apis/doc/1/static


## ROUTES callbacks

	/api.js
		"CRUD" 
		for
			TEXTDATA 
			METADATA
			DOCCOMMENT
			DOCLOG

		+ misc (internals use)

	/doc.js
		DOC LISTS, GET, EDIT, ...

	/lab.js
		for dev's /-)  This is a sandbox, need to be included to work


	/user.js 
		User profile infos


## Todo

	* add and build pass travis
	* more dockey control
	* users apis ++


#### AUTHOR

Tom Wersinger <homeof@gmail.com>

## COPYRIGHT

Copyright (C) 2014 Tom Wersinger <homeof@gmail.com>

#### LICENSE

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.


#### DISCLAIMER

The author disclaims any responsibility for any mangling of your system etc, that this script may cause.
