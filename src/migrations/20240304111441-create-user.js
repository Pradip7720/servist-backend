'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      middle_name: {
        type: Sequelize.STRING,
      },
      middle_initial: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('1', '2'),
        defaultValue: '2'
      },
      pincode: {
        type: Sequelize.STRING,
      },
      mobile_country_code: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      is_verified: {
        type: Sequelize.ENUM('1', '2', '3'),
        defaultValue: '1'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_licence_added: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      email_confirmation_token: {
        type: Sequelize.TEXT,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      theme: {
        type: Sequelize.STRING,
      },
      password_updated_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
      },
      verified_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      verified_at: {
        type: Sequelize.DATE
      },
      rejected_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      rejected_at: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('Users', ['id'], {
      name: 'idx_users_id'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
