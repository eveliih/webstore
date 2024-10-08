const cartItemsRouter = require("express").Router();
const { CartItem } = require("../models");

cartItemsRouter.post("/", async (request, response) => {
  const { cart_id, product_id, quantity } = request.body;
  console.log(request.body);
  try {
    const newItem = await CartItem.create({
      cart_id,
      product_id,
      quantity,
    });
    response.status(201).json(newItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

cartItemsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await CartItem.destroy({
      where: { id },
    });
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

cartItemsRouter.get("/", async (request, response) => {
  try {
    const items = await CartItem.findAll();
    response.status(200).json(items);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

cartItemsRouter.get("/cart/:cart_id", async (request, response) => {
  const { cart_id } = request.params;
  try {
    const items = await CartItem.findAll({
      where: { cart_id },
    });
    response.status(200).json(items);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

cartItemsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { quantity } = request.body;
  try {
    const item = await CartItem.findByPk(id);
    if (!item) {
      return response.status(404).json({ error: "Cart item not found" });
    }
    item.quantity = quantity;
    await item.save();
    response.status(200).json(item);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = cartItemsRouter;
