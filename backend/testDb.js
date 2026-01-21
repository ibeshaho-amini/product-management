require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use your development DB URL
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
