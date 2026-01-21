// require('dotenv').config();

// module.exports = {
//   development: {
//     username: process.env.DEV_DB_USER,
//     password: process.env.DEV_DB_PASS,
//     database: process.env.DEV_DB_NAME,
//     host: process.env.DEV_DB_HOST,
//     port: process.env.DEV_DB_PORT || 5432,
//     dialect: 'postgres',
//   },

//   test: {
//     username: process.env.DEV_DB_USER,
//     password: process.env.DEV_DB_PASS,
//     database: process.env.DEV_DB_NAME,
//     host: process.env.DEV_DB_HOST,
//     port: process.env.DEV_DB_PORT || 5432,
//     dialect: 'postgres',
//   },

//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   },
// };


require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT || 5432,
    dialect: 'postgres',
  },

  test: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT || 5432,
    dialect: 'postgres',
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};