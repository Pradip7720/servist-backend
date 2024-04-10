'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bio: {
        type: Sequelize.TEXT
      },
      practice_area: {
        type: Sequelize.STRING(50)
      },
      linkedin_profile: {
        type: Sequelize.STRING(250)
      },
      website: {
        type: Sequelize.STRING(250)
      },
      facebook: {
        type: Sequelize.STRING(250)
      },
      twitter: {
        type: Sequelize.STRING(250)
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING(100))
      },
      law_speciality: {
        type: Sequelize.STRING(50)
      },
      profile_pic: {
        type: Sequelize.STRING(255)
      },
      cover_photo: {
        type: Sequelize.STRING(255)
      },
      job_title: {
        type: Sequelize.STRING(100)
      },
      latitude: {
        type: Sequelize.STRING(255)
      },
      longitude: {
        type: Sequelize.STRING(255)
      },
      user_handle: {
        type: Sequelize.STRING(50)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('UserProfile', ['user_id'], {
      name: 'idx_profile_users_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProfile');
  }
};
