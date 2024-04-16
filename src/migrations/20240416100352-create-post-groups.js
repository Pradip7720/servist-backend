'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      group_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'groups',
          key: 'id'
        }
      },
      post_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_groups');
  }
};
