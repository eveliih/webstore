const cartsRouter = require("express").Router();
const { Cart } = require("../models");

cartsRouter.post("/", async (req, res) => {
  const { user_id, total } = req.body;

  if (user_id === undefined || total === undefined) {
    return res.status(400).json({ error: "user_id and total are required" });
  }

  try {
    const newCart = await Cart.create({ user_id, total });
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

cartsRouter.get("/", async (request, response) => {
  try {
    const carts = await Cart.findAll();
    response.status(200).json(carts);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

cartsRouter.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "No cart found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

cartsRouter.put("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const { total } = req.body;

  console.log(req.body);
  if (total === undefined) {
    return res.status(400).json({ error: "total is required" });
  }

  try {
    const cart = await Cart.findOne({ where: { id: cartId } });
    if (cart) {
      cart.total = total;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "No cart found with this ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = cartsRouter;
