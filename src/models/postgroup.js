module.exports = (sequelize, DataTypes) => {
  const PostGroup = sequelize.define('PostGroup', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
      defaultValue: true
    }
  });

  PostGroup.associate = (models) => {
    PostGroup.belongsTo(models.Group, { foreignKey: 'group_id', as: 'group' });
    PostGroup.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  };

  return PostGroup;
};
