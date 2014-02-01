var DAO = require("sequelize/lib/dao"),
    Utils = require("sequelize/lib/utils");


module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Room", {
            slug: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			name: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			restricted: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			locked : {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			owners: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            user_count: {
                type: DataTypes.INTEGER,
                validate: {
                },
            }
        },
          {
        classMethods: {
            addIdoc : function(){

                console.log('qsdqsd')
            },
            setIdoc : function(){

                console.log('qsdqsd')
            }
        },
        instanceMethods: {
            save_raw: DAO.prototype.save, 
            save: function(params){
                    //console.log(this)
                  console.log('room save')
                  //console.log(this.selectedValues)

                 return this.save_raw(params);



                //
                //return;
            }
        }
    });
};