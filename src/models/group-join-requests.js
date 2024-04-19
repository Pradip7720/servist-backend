module.exports = (sequelize, DataTypes) => {
  const GroupJoinRequest = sequelize.define('GroupJoinRequest', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    accepted_by: {
      type: DataTypes.UUID,
    },
    accepted_at: {
      type: DataTypes.DATE,
    },
    rejected_by: {
      type: DataTypes.UUID,
    },
    rejected_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'group_join_requests',
    timestamps: false,
    indexes: [
      {
        name: 'idx_group_join_requests_group_id',
        fields: ['group_id'],
      },
      {
        name: 'idx_group_join_requests_user_id',
        fields: ['user_id'],
      },
    ],
  });
  return GroupJoinRequest;
};
