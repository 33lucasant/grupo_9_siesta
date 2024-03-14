module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        role_id: dataTypes.BIGINT(10)
    }

    let config = {
        timestamps: false,
        tableName: 'users'
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        
        User.belongsTo(models.Role, {
            as: 'roles',
            foreignKey: 'role_id'
        });

        User.belongsToMany(models.User, {
            as: "products",
            through: "order_detail",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        });
    }
            
    return User;
}