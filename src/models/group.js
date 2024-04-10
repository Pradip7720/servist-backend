module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      group_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      profile_image: {
        type: DataTypes.STRING(100)
      },
      banner_file: {
        type: DataTypes.STRING(100)
      },
      banner_file_type: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      privacy: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      parent_group: {
        type: DataTypes.UUID
      },
      city: {
        type: DataTypes.STRING(50)
      },
      state: {
        type: DataTypes.STRING(20)
      },
      is_approved_by_moderator: {
        type: DataTypes.BOOLEAN
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE
      },
      created_by: {
        type: DataTypes.UUID
      },
      updated_by: {
        type: DataTypes.UUID
      }
    }
  );

  Group.associate = (models) => {
    Group.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Group.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    Group.hasMany(models.Group, { foreignKey: 'parent_group', as: 'subGroups' });
  };

  return Group;
};
