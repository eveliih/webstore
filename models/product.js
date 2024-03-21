const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Product_Id'
  },
    name: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Product_Name'
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Category'
  },
  price: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Price'
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'product',
  tableName: 'Products'
})

module.exports = Product