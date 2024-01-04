
const dotenv = require('dotenv');
dotenv.config();


// Backend/config.js
module.exports = {
    db: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Tha@021103',
      database: process.env.DB_DATABASE || 'docker',
    },
    PORT: 3002
  };
  