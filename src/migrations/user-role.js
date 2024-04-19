'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'role', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'role');
    }
};
