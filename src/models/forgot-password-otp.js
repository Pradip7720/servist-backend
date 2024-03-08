module.exports = (sequelize, DataTypes) => {
    const ForgotPasswordOtp = sequelize.define('forgot_password_otp', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expire_time: {
            type: DataTypes.DATE,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'forgot_password_otps',
        timestamps: false, // If you want Sequelize to handle timestamps, set it to true
        indexes: [
            {
                name: 'idx_forgot_password_otps_user_id',
                fields: ['user_id'],
            },
        ],
    });
    return ForgotPasswordOtp;
}
