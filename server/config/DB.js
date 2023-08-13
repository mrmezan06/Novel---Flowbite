const moongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const connectionParams = {
      dbName: process.env.DB_NAME,
    };
    const conn = await moongoose.connect(
      process.env.MONGO_URI,
      connectionParams
    );
    console.log(
      `${colors.green.bold('MongoDB Connected:')} ${colors.blue.bold(
        conn.connection.host
      )}`
    );
  } catch (error) {
    console.log(`${colors.red.bold('Error:')} ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
