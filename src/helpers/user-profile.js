module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('user_profile', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        practice_area: {
            type: DataTypes.STRING(50),
        },
        linkedin_profile: {
            type: DataTypes.STRING(250),
        },
        website: {
            type: DataTypes.STRING(250),
        },
        facebook: {
            type: DataTypes.STRING(250),
        },
        twitter: {
            type: DataTypes.STRING(250),
        },
        languages: {
            type: DataTypes.ARRAY(DataTypes.STRING(100)),
        },
        law_speciality: {
            type: DataTypes.STRING(50),
        },
        profile_pic: {
            type: DataTypes.STRING(255),
        },
        cover_photo: {
            type: DataTypes.STRING(255),
        },
        job_title: {
            type: DataTypes.STRING(100),
        },
        latitude: {
            type: DataTypes.STRING(255),
        },
        longitude: {
            type: DataTypes.STRING(255),
        },
        user_handle: {
            type: DataTypes.STRING(50),
        },
    }, {
        tableName: 'user_profiles',
        timestamps: false, // If you want Sequelize to handle timestamps, set it to true
        indexes: [
            {
                name: 'idx_user_profiles_user_id',
                fields: ['user_id'],
            },
        ],
    });

    // Associations can be defined here if needed

    return UserProfile;
};
