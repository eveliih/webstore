const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders", // Table name in the database
    timestamps: true,
  }
);

module.exports = Order;
