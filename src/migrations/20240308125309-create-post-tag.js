'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostTags', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('PostTags', ['post_id'], { name: 'idx_post_tags_post_id' });
    await queryInterface.addIndex('PostTags', ['user_id'], { name: 'idx_post_tags_user_id' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostTags');
  }
};
