module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      post_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT
      },
      location: {
        type: DataTypes.STRING(250)
      },
      speciality_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      post_anonymously: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      hiring_recommendation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      total_views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      total_comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      latitude: {
        type: DataTypes.STRING(255)
      },
      longitude: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE
      },
      created_by: {
        type: DataTypes.UUID
      },
      updated_by: {
        type: DataTypes.UUID
      }
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'created_by', as: 'created_by' });
    Post.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updated_by' });

    Post.belongsTo(models.SpecialityMaster, { foreignKey: 'speciality_id', as: 'speciality' });
  };

  return Post;
};
