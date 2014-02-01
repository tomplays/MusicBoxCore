module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Node", {
            slug: {
                type: DataTypes.TEXT,
              //  unique: true,
                validate: {
                },
            },
			name: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			taxonomy: {
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
                type: DataTypes.TEXT,
                validate: {
                },
            },
			objectcount: {
                type: DataTypes.INTEGER,	
                validate: {
                },
            }		

        }
    );
};

