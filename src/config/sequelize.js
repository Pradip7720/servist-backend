const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${err}`);
  });
  async function syncDatabase() {
    try {
      await sequelize.sync({ force: true }); // This will drop existing tables and re-create them
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  }
  
  syncDatabase();