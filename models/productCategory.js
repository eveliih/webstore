const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ProductCategory extends Model {}

ProductCategory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id'
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Name'
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'productCategory',
  tableName: 'product_category'
})

module.exports = ProductCategory