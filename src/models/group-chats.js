module.exports = (sequelize, DataTypes) => {
  const GroupChat = sequelize.define('GroupChat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,

    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attachment: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    attachment_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sent_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'group_chats', // Add table name here
    timestamps: false
  });

  // associations 
  return GroupChat;
};
