module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    banner_file: {
      type: DataTypes.STRING,
    },
    banner_file_type: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privacy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    parent_group: {
      type: DataTypes.UUID,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    is_approved_by_moderator: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.UUID,
    },
    updated_by: {
      type: DataTypes.UUID,
    },
  }, {
    tableName: 'groups',
    timestamps: false,
    indexes: [
      {
        name: 'idx_groups_created_by',
        fields: ['created_by'],
      },
      {
        name: 'idx_groups_type',
        fields: ['type'],
      },
    ],
  });

  // Add associations here if needed
  Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: 'GroupMembers', foreignKey: 'groupId' });
    // Group.belongsToMany(models.Post, { through: 'PostGroups', foreignKey: 'groupId' });

};

  return Group;
};
