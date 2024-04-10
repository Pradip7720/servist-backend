'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the Posts table
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      post_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING(250)
      },
      speciality_id: {
        type: Sequelize.UUID
      },
      post_anonymously: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      hiring_recommendation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      total_views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_comments: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      latitude: {
        type: Sequelize.STRING(255)
      },
      longitude: {
        type: Sequelize.STRING(255)
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
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      updated_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });

    await queryInterface.addIndex('Posts', ['speciality_id'], {
      name: 'idx_posts_speciality_id'
    });
    await queryInterface.addIndex('Posts', ['created_by'], {
      name: 'idx_posts_created_by'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Posts table
    await queryInterface.dropTable('posts');
  }
};
