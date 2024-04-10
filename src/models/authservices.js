module.exports = (sequelize, DataTypes) => {
  const AuthService = sequelize.define(
    'AuthService',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      service_name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      refresh_token: {
        type: DataTypes.TEXT
      },
      expires_at: {
        type: DataTypes.DATE
      },
      scope: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }
  );

  AuthService.associate = function (models) {
    AuthService.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return AuthService;
};
