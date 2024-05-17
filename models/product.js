const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Product_Id",
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "Product_Name",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Category_Id",
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "Price",
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "Ingredients",
    },
    origin: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "Origin",
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "product",
    tableName: "Products",
  }
);

module.exports = Product;
