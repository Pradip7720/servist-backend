module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Speciality', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    speciality: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'speciality_masters', // Adjust table name if needed
    timestamps: false, // Set to true if you want Sequelize to handle timestamps
  });

  // Add associations here if needed

  return Post;
};
