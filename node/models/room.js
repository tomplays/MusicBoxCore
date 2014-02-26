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
            // doing nothing yet
            addIdoc : function(){
                console.log('addedIdoc (model classMethods)')
            },
            setIdoc : function(){
                console.log('SertIdoc (model classMethods)')
            }
        },
        instanceMethods: {
            save_raw: DAO.prototype.save, 
            save: function(params){
                  console.log('room saved')
                  //console.log(this.selectedValues)
                 return this.save_raw(params);
                //
                //return;
            }
        }
    });
};