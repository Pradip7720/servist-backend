module.exports = (sequelize, DataTypes) => {
  const GroupNotificationPreferences = sequelize.define('GroupNotificationPreferences', {
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
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    },
    all_post: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    daily_roundup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    weekly_roundup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    all_reply: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'group_notification_preferences',
    timestamps: false
  });

  GroupNotificationPreferences.associate = (models) => {
    GroupNotificationPreferences.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    GroupNotificationPreferences.belongsTo(models.Group, { foreignKey: 'group_id', as: 'group' });
  };

  return GroupNotificationPreferences;
};
