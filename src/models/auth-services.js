
module.exports = (sequelize, DataTypes) => {
    const AuthService = sequelize.define('auth_service', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        service_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
        },
        expires_at: {
            type: DataTypes.DATE,
        },
        scope: {
            type: DataTypes.STRING(255),
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'auth_services',
        timestamps: false, 
        indexes: [
            {
                name: 'idx_auth_services_user_id',
                fields: ['user_id'],
            },
        ],
    });
    return AuthService;
}

