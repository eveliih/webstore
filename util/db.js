const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      requestTimeout: 30000,
    },
  },
  retry: {
    max: 5,
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed " + err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
