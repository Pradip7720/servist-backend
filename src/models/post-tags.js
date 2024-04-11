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
    tableName: 'post_tags', // Adjust table name if needed
    timestamps: false, // Set to true if you want Sequelize to handle timestamps
  });

  // Add associations here if needed

  return PostTags;
};
