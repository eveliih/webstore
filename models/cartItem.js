const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CartItem",
    tableName: "cart_item",
  }
);

module.exports = CartItem;
