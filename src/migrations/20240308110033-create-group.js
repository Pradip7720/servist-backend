'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      group_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      profile_image: {
        type: Sequelize.STRING(100)
      },
      banner_file: {
        type: Sequelize.STRING(100)
      },
      banner_file_type: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      privacy: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      parent_group: {
        type: Sequelize.UUID
      },
      city: {
        type: Sequelize.STRING(50)
      },
      state: {
        type: Sequelize.STRING(20)
      },
      is_approved_by_moderator: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      }
    });

    await queryInterface.addIndex('groups', ['created_by'], { name: 'idx_groups_created_by' });
    await queryInterface.addIndex('groups', ['type'], { name: 'idx_groups_type' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};
