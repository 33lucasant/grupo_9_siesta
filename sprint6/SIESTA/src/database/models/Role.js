module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        licenses: {
            type: dataTypes.TINYINT,
            allowNull: false
        }
    }

    let config = {
        timestamps: false,
        tableName: 'roles'
    }

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models) {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role_id'
        });
    }
            
    return Role;
}