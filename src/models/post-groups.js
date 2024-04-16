// Define the PostGroup model
module.exports = (sequelize, DataTypes) => {
  const PostGroup = sequelize.define('PostGroup', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'post_groups',
    timestamps: false
  });

  PostGroup.associate = models => {
    // Define associations here if any
  };

  return PostGroup;
};
