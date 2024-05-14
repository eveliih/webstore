const Product = require('./product')
const Image = require('./image')
const User = require('./user')
const ProductCategory = require('./productCategory')


Product.hasOne(Image, { onDelete: 'CASCADE'});
Image.belongsTo(Product);

Product.belongsTo(ProductCategory, { foreignKey: 'categoryId' });
ProductCategory.hasMany(Product, { foreignKey: 'categoryId' });


module.exports = {
  Product, Image, User, ProductCategory
}