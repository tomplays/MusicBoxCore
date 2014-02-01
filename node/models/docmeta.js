var DAO = require("sequelize/lib/dao"),
    Utils = require("sequelize/lib/utils");


module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Docmeta", {
            meta_key: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            meta_value: {
                type: DataTypes.TEXT,
                validate: {
                }
            }
        },
        {
        classMethods: {
           
        },
        instanceMethods: {
            save_raw: 
                DAO.prototype.save,
            save: function(){
                //console.log('saving docmeta')
                //console.log(this.meta_key,this.meta_value ,this.IdocId)
                return this.save_raw();
                //
                //return;
            }
        }
    });
};




