module.exports = (sequelize, DataTypes) => {
  const UserPreference = sequelize.define('UserDmPreference', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    all_members: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    outside_their_group: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    specific_group: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'user_dm_preferences',
    timestamps: false
  });

  UserPreference.associate = (models) => {
    UserPreference.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return UserPreference;
};
