const supertest = require("supertest");
const { test, after, beforeEach } = require("node:test");
const { sequelize } = require("../util/db");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);
const assert = require("assert").strict;

beforeEach(async () => {
  await User.destroy({ where: {} });
});

test("a valid user can be added ", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "Testpassword1!",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.username, newUser.username);
  assert.strictEqual(result.body.name, newUser.name);
});

test("user without a username is not added", async () => {
  const newUser = {
    name: "Test User",
    password: "Testpassword1!",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert.match(
    result.body.error,
    /notNull Violation: user\.username cannot be null/
  );
});

test("user without a password is not added", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert.match(
    result.body.error,
    /Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character./
  );
});

test("user with password not meeting complexity requirements is not added", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "password",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert.match(
    result.body.error,
    /Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character./
  );
});

after(async () => {
  await sequelize.close();
});
