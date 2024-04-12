// Import Sequelize module
const { DataTypes } = require('sequelize');

// Define the model function
module.exports = (sequelize) => {
  // Define the CommentReply model
  const CommentReply = sequelize.define('CommentReply', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'post_comments',
        key: 'id'
      }
    },
    parent_reply_id: {
      type: DataTypes.UUID,
      references: {
        model: 'comment_replies',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {

    tableName: 'comment_replies',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
      {
        fields: ['user_id']
      },
      {
        fields: ['comment_id']
      },
      {
        fields: ['parent_reply_id']
      }
    ]
  });

  CommentReply.associate = (models) => {
    CommentReply.belongsTo(models.PostComment, { foreignKey: 'comment_id', as: 'comments', onDelete: 'CASCADE' });
    CommentReply.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  // Return the model
  return CommentReply;
};
