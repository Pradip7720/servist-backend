module.exports = (sequelize, DataTypes) => {
  const PostPin = sequelize.define('PostPin', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
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
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'post_pins', // Adjust table name if needed
    timestamps: false // Set to true if you want Sequelize to handle timestamps
  });

  // Add associations here if needed

  return PostPin;
};
