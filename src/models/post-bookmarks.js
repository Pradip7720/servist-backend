module.exports = (sequelize, DataTypes) => {
  const PostBookmark = sequelize.define('PostBookmark', {
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
      allowNull: false,
    },
  }, {
    tableName: 'post_bookmarks',
    timestamps: false,
  });

  // Add associations if needed

  return PostBookmark;
};
