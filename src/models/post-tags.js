module.exports = (sequelize, DataTypes) => {
  const PostTags = sequelize.define('PostTags', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'post_tags',
    timestamps: false,
  });

  PostTags.associate = models => {
    // Association with User model
    PostTags.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Association with Post model
    PostTags.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post',
    });
  };

  return PostTags;
};
