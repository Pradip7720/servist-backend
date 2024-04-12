
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment_replies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      comment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'post_comments',
          key: 'id'
        }
      },
      parent_reply_id: {
        type: Sequelize.UUID,
        references: {
          model: 'comment_replies',
          key: 'id'
        }
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });

    await queryInterface.addIndex('comment_replies', ['id']);
    await queryInterface.addIndex('comment_replies', ['user_id']);
    await queryInterface.addIndex('comment_replies', ['comment_id']);
    await queryInterface.addIndex('comment_replies', ['parent_reply_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment_replies');
  }
};
