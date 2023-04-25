const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbUrlBanco = process.env.DB_URL;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbUrlBanco}`,
    );
    // eslint-disable-next-line no-console
    console.log('Conectou ao banco de dados!');

    return dbConn;
  } catch (error) {
    return Promise.reject(error);
  }
};

conn();

module.exports = conn;
