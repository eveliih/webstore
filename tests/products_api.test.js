const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const { sequelize } = require("../util/db");
const api = supertest(app);
const Product = require("../models/product");
const Image = require("../models/image");
const Category = require("../models/productCategory");
const assert = require("node:assert");
const {
  initialProducts,
  initialImages,
  initialCategories,
} = require("../util/initialDataforTests");

beforeEach(async () => {
  await Product.destroy({ where: {} });
  await Image.destroy({ where: {} });
  await Category.destroy({ where: {} });

  let createdCategory;
  for (let category of initialCategories) {
    createdCategory = await Category.create(category);
  }

  let createdProducts = [];
  for (let product of initialProducts) {
    product.categoryId = createdCategory.id;
    let createdProduct = await Product.create(product);
    createdProducts.push(createdProduct);
  }

  for (let i = 0; i < initialImages.length; i++) {
    initialImages[i].productId = createdProducts[i].id;
    await Image.create(initialImages[i]);
  }
});

test("products are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 3 products", async () => {
  const response = await api.get("/api/products");

  assert.strictEqual(response.body.length, initialProducts.length);
});

test("each product has the correct structure", async () => {
  const response = await api.get("/api/products");

  response.body.forEach((product) => {
    assert.ok(product.id);
    assert.ok(product.name);
    assert.ok(product.price);
    assert.ok(product.categoryId);
    assert.ok(product.ingredients);
    assert.ok(product.origin);
  });
});

after(async () => {
  await sequelize.close();
});
