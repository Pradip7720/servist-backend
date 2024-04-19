module.exports = (sequelize, DataTypes) => {
  const UserContact = sequelize.define('UserContact', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    is_mute: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user_contacts',
    timestamps: false
  });

  UserContact.associate = (models) => {
    UserContact.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    UserContact.belongsTo(models.User, { foreignKey: 'contact_id', as: 'contact' });
  };

  return UserContact;
};
