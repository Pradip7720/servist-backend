const User = require("../models")

module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define('PostComment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'post_comments',
    timestamps: true,
    underscored: true
  });

  PostComment.associate = models => {
    PostComment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post',
    });
    PostComment.belongsTo(models.User, { // Define the association with User model
      foreignKey: 'user_id',
      as: 'user',
    });
    PostComment.hasMany(models.CommentReply, { as: 'replies', foreignKey: 'comment_id' });

  };
  return PostComment;
};
