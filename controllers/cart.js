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

module.exports = cartsRouter;
