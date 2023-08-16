const moongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const connectionParams = {
      // TODO: Changed to process.env.DB_NAME
      dbName: process.env.DBNAME,
    };
    const conn = await moongoose.connect(
      // TODO: Changed to process.env.MONGO_URI
      process.env.MONGOURI,
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
