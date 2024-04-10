'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SpecialityMasters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      speciality: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('SpecialityMasters', ['id'], {
      name: 'idx_specilaity_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SpecialityMasters');
  }
};
