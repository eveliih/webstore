const Product = require('./product')
const Image = require('./image')

Product.hasOne(Image, { onDelete: 'CASCADE'});
Image.belongsTo(Product);


Product.sync({ alter: true })
Image.sync({ alter: true })


module.exports = {
  Product, Image
}