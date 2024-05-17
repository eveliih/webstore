const Product = require("./product");
const Image = require("./image");
const User = require("./user");
const ProductCategory = require("./productCategory");
const Cart = require("./cart");
const CartItem = require("./cartItem");

Product.hasOne(Image, { onDelete: "CASCADE" });
Image.belongsTo(Product);

Product.belongsTo(ProductCategory, { foreignKey: "categoryId" });
ProductCategory.hasMany(Product, { foreignKey: "categoryId" });

User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  Product,
  Image,
  User,
  ProductCategory,
  Cart,
  CartItem,
};
