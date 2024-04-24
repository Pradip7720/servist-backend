module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_notification_preferences', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id'
        }
      },
      all_post: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      daily_roundup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      weekly_roundup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      all_reply: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('group_notification_preferences');
  }
};
