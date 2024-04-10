module.exports = (sequelize, DataTypes) => {
  const LicenceDetail = sequelize.define(
    'LicenceDetail',
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
      licence_number: {
        type: DataTypes.STRING(150)
      },
      licence_document: {
        type: DataTypes.STRING(255)
      },
      is_verified: {
        type: DataTypes.ENUM('1', '2', '3'),
        defaultValue: '1',
        allowNull: false
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
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
    timestamps: false
  });

  LicenceDetail.associate = (models) => {
    LicenceDetail.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    LicenceDetail.belongsTo(models.User, { foreignKey: 'verified_by', as: 'verifiedByUser' });
    LicenceDetail.belongsTo(models.User, { foreignKey: 'rejected_by', as: 'rejectedByUser' });
  };

  return LicenceDetail;
};
