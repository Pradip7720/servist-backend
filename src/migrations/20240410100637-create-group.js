
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      group_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      profile_image: {
        type: Sequelize.STRING,
      },
      banner_file: {
        type: Sequelize.STRING,
      },
      banner_file_type: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      privacy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      parent_group: {
        type: Sequelize.UUID,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      is_approved_by_moderator: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.UUID,
      },
      updated_by: {
        type: Sequelize.UUID,
      },
    });

    // Add indexes if needed
    await queryInterface.addIndex('groups', ['created_by'], {
      name: 'idx_groups_created_by',
    });
    await queryInterface.addIndex('groups', ['type'], {
      name: 'idx_groups_type',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groups');
  }
};
