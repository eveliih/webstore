const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("dist"));
app.use(bodyParser.json());

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const productsRouter = require("./controllers/products");
const imagesRouter = require("./controllers/images");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const cartRouter = require("./controllers/cart");
const cartItemRouter = require("./controllers/cartItems");
const emailRouter = require("./controllers/email");
const orderRouter = require("./controllers/order");
const orderItemRouter = require("./controllers/orderItems");

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cartItem", cartItemRouter);
app.use("/api/email", emailRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderItem", orderItemRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
