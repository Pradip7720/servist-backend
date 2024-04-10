module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE
    }
  });

  PostTag.associate = (models) => {
    PostGroup.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    PostGroup.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  };

  return PostTag;
};
