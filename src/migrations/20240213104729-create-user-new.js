const role = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {

    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    pincode: {
      type: Sequelize.STRING,
    },
    role_id: {
      type: Sequelize.INTEGER,
    },

    is_verified: {
      type: Sequelize.STRING,
      defaultValue: 'pending',
    },
    mobile_country_code: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    theme: {
      type: Sequelize.STRING,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    is_licence_added: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    password_updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    created_by: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    updated_by: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },

  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
