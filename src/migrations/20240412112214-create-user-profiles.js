'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      practice_area: {
        type: Sequelize.STRING(50),
      },
      linkedin_profile: {
        type: Sequelize.STRING(250),
      },
      website: {
        type: Sequelize.STRING(250),
      },
      facebook: {
        type: Sequelize.STRING(250),
      },
      twitter: {
        type: Sequelize.STRING(250),
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING(100)),
      },
      law_speciality: {
        type: Sequelize.STRING(50),
      },
      profile_pic: {
        type: Sequelize.STRING(255),
      },
      cover_photo: {
        type: Sequelize.STRING(255),
      },
      job_title: {
        type: Sequelize.STRING(100),
      },
      latitude: {
        type: Sequelize.STRING(255),
      },
      longitude: {
        type: Sequelize.STRING(255),
      },
      user_handle: {
        type: Sequelize.STRING(50),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_profiles');
  }
};
