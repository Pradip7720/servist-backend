module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'Group',
      {
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pincode: {
          type: DataTypes.STRING,
        },
        role_id: {
          type: DataTypes.INTEGER,
        },
        is_verified: {
          type: DataTypes.STRING,
          defaultValue: 'pending',
          allowNull: false,
        },
        mobile_country_code: {
          type: DataTypes.STRING,
        },
        phone_number: {
          type: DataTypes.STRING,
        },
        theme: {
          type: DataTypes.STRING,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        is_licence_added: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        password_updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        created_by: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        updated_by: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
      },
      {
        defaultScope: {
          attributes: { exclude: ['password', 'verifyToken', 'isAdmin'] },
        },
        scopes: {
          withSecretColumns: {
            attributes: { include: ['password', 'verifyToken', 'isAdmin'] },
          },
        },
      },
    );
    User.associate = function () {
      // associations can be defined here
    };
    return User;
  };
  