module.exports = (sequelize, DataTypes) => {
  const ForgotPasswordOTP = sequelize.define(
    'Otp',
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
      otp: {
        type: DataTypes.STRING(6),
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      expire_time: {
        type: DataTypes.TIMESTAMP
      },
      created_at: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.TIMESTAMP
      }
    }, {
    timestamps: false
  });

  ForgotPasswordOTP.associate = (models) => {
    ForgotPasswordOTP.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return ForgotPasswordOTP;
};
