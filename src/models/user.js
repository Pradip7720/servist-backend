module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      middle_name: {
        type: DataTypes.STRING,
      },
      middle_initial: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('1', '2'),
        defaultValue: '2'
      },
      pincode: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      mobile_country_code: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.ENUM('1', '2', '3'),
        defaultValue: '1'
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      is_licence_added: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      email_confirmation_token: {
        type: DataTypes.TEXT,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      theme: {
        type: DataTypes.STRING,
      },
      password_updated_at: {
        type: DataTypes.DATE
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      created_by: {
        type: DataTypes.UUID
      },
      updated_by: {
        type: DataTypes.UUID
      },
      verified_by: {
        type: DataTypes.UUID
      },
      verified_at: {
        type: DataTypes.DATE
      },
      rejected_by: {
        type: DataTypes.UUID
      },
      rejected_at: {
        type: DataTypes.DATE
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.User, { foreignKey: 'created_by', as: 'createdUsers', constraints: false });
    User.hasMany(models.User, { foreignKey: 'updated_by', as: 'updatedUsers', constraints: false });
    User.hasMany(models.User, { foreignKey: 'verified_by', as: 'verifiedUsers', constraints: false });
    User.hasMany(models.User, { foreignKey: 'rejected_by', as: 'rejectedUsers', constraints: false });
    
    User.hasMany(models.Post, { foreignKey: 'created_by', as: 'posts' });
  };

return User;
};
