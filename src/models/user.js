module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      middle_name: {
        type: DataTypes.STRING,
      },
      middle_initial: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(1, 2), // Adjust enum values as needed
        allowNull: false,
        defaultValue: 2, // Adjust default value as needed
      },
      pincode: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      mobile_country_code: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_licence_added: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      email_confirmation_token: {
        type: DataTypes.TEXT,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      theme: {
        type: DataTypes.STRING,
      },
      password_updated_at: {
        type: DataTypes.DATE,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.UUID,
      },
      updated_by: {
        type: DataTypes.UUID,
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
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Group, { through: 'GroupMembers', foreignKey: 'userId' });
    User.hasMany(models.PostComment, {
      foreignKey: 'user_id',
      as: 'comments',
    });
    User.hasMany(models.Post, {
      foreignKey: 'created_by',
      as: 'posts',
    });
    User.hasOne(models.UserProfile, {
      foreignKey: 'user_id',
      as: 'profile',
    });
    User.hasMany(models.CommentReply, { foreignKey: 'user_id', as: 'replies' });
    User.hasMany(models.PostTags, {
      foreignKey: 'user_id',
      as: 'postTags',
    });
    User.belongsToMany(models.Group, { through: models.UserGroup, foreignKey: 'user_id' });
    User.hasMany(models.UserContact, { foreignKey: 'user_id', as: 'contacts' });
    User.hasMany(models.UserContact, { foreignKey: 'contact_id', as: 'contactedUsers' });
    User.hasMany(models.BlockedUser, { foreignKey: 'user_id', as: 'blockedUsers' });
    User.hasMany(models.BlockedUser, { foreignKey: 'block_user_id', as: 'blockingUsers' });
  };

  return User;
};
