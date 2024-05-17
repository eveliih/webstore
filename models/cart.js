const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class Cart extends Model {}

Cart.init(
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
    tableName: "cart",
    timestamps: true,
  }
);

module.exports = Cart;
