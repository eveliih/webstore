const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Image_Id'
  },
    url: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Url'
  },
  alt: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'Alt'
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'image',
  tableName: 'Images'
})

module.exports = Image