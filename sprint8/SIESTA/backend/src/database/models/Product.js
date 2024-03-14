module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: { 
            type: dataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        description: {
            type: dataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        category: {
            type: dataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        color: {
            type: dataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        size: {
            type: dataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: dataTypes.MEDIUMINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }

    let config = {
        timestamps: false,
        tableName: 'products'
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        
        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: "product_id"
        });

        Product.belongsToMany(models.User, {
            as: "users",
            through: "order_detail",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        });

    }
            
    return Product;
}