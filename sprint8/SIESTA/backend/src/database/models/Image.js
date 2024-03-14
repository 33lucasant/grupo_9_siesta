module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';
    let cols = {

        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        product_id: { 
            type: dataTypes.INTEGER,
            allowNull: false
        },

        image: { 
            type: dataTypes.STRING(255),
            allowNull: false                              
        },
    }

    let config = {
        timestamps: false,
        tableName: "images"
    }


    const Image = sequelize.define (alias, cols, config)   


    Image.associate = function (models) {

        Image.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
        
    }
 
    return Image;   
}