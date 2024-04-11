'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      post_title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING(250),
      },
      speciality_id: {
        type: Sequelize.UUID,
      },
      post_anonymously: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      hiring_recommendation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      total_views: {
        type: Sequelize.INTEGER,
      },
      total_comments: {
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.STRING(255),
      },
      longitude: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_by: {
        type: Sequelize.UUID,
      },
      updated_by: {
        type: Sequelize.UUID,
      },
    });

    await queryInterface.addIndex('posts', ['speciality_id'], {
      name: 'idx_posts_speciality_id',
    });

    await queryInterface.addIndex('posts', ['created_by'], {
      name: 'idx_posts_created_by',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  },
};
