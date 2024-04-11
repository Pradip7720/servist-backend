module.exports = (sequelize, DataTypes) => {
    const LicenceDetails = sequelize.define('LicenceDetails', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        licence_number: {
            type: DataTypes.STRING(150),
        },
        licence_document: {
            type: DataTypes.STRING(255),
        },
        is_verified: {
            type: DataTypes.ENUM('1', '2', '3'),
            defaultValue: '1'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        verified_by: {
            type: DataTypes.UUID,
        },
        verified_at: {
            type: DataTypes.DATE,
        },
        rejected_by: {
            type: DataTypes.UUID,
        },
        rejected_at: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'licence_details',
        timestamps: false, // If you want Sequelize to handle timestamps, set it to true
        indexes: [
            {
                name: 'idx_licence_details_user_id',
                fields: ['user_id'],
            },
        ],
    });
    return LicenceDetails;
}

