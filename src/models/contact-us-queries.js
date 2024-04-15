module.exports = (sequelize, DataTypes) => {
  const ContactUsQuery = sequelize.define('ContactUsQuery', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    mobile_country_code: {
      type: DataTypes.STRING(5),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'contact_us_queries',
    timestamps: false,
  });

  return ContactUsQuery;
};
