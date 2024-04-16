const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserGroup = sequelize.define('UserGroup', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_moderator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    deleted_by: {
      type: DataTypes.UUID,
    },
    admin_since: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'user_groups',
    timestamps: false, // Disable default timestamps (createdAt, updatedAt)
  });

  UserGroup.associate = (models) => {
    UserGroup.belongsTo(models.User, { foreignKey: 'user_id' });
    UserGroup.belongsTo(models.Group, { foreignKey: 'group_id' });
  };

  return UserGroup;
};
