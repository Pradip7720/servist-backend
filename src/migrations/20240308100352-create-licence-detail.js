'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LicenceDetails', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      licence_number: {
        type: Sequelize.STRING(150)
      },
      licence_document: {
        type: Sequelize.STRING(255)
      },
      is_verified: {
        type: Sequelize.ENUM('1', '2', '3'),
        defaultValue: '1',
        allowNull: false
      },
      verified_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      verified_at: {
        type: Sequelize.DATE
      },
      rejected_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rejected_at: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('LicenceDetails', ['user_id'], {
      name: 'idx_license_users_id'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LicenceDetails');
  }
};
