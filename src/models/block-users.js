module.exports = (sequelize, DataTypes) => {
  const BlockedUser = sequelize.define('BlockedUser', {
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
    block_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'blocked_users',
    timestamps: false
  });

  BlockedUser.associate = (models) => {
    BlockedUser.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    BlockedUser.belongsTo(models.User, { foreignKey: 'block_user_id', as: 'blockUser' });
  };

  return BlockedUser;
};
