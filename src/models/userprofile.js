module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      bio: {
        type: DataTypes.TEXT
      },
      practice_area: {
        type: DataTypes.STRING(50)
      },
      linkedin_profile: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      website: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      facebook: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      twitter: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING(100)),
        allowNull: true
      },
      law_speciality: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      profile_pic: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      cover_photo: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      job_title: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      latitude: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      longitude: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      user_handle: {
        type: DataTypes.STRING(50)
      }
    }, {
    timestamps: false
  });

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return UserProfile;
};
