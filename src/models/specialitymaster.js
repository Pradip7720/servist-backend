module.exports = (sequelize, DataTypes) => {
  const SpecialityMaster = sequelize.define(
    'SpecialityMaster',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      speciality: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE
      }
    }
  );

  return SpecialityMaster;
};
