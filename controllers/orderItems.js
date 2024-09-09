const orderItemsRouter = require("express").Router();
const { OrderItem } = require("../models");

orderItemsRouter.post("/", async (request, response) => {
  const { order_id, product_id, quantity } = request.body;
  try {
    const newItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
    });
    response.status(201).json(newItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

orderItemsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await OrderItem.destroy({
      where: { id },
    });
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

orderItemsRouter.get("/", async (request, response) => {
  try {
    const items = await OrderItem.findAll();
    response.status(200).json(items);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

orderItemsRouter.get("/order/:order_id", async (request, response) => {
  const { order_id } = request.params;
  try {
    const items = await OrderItem.findAll({
      where: { order_id },
    });
    response.status(200).json(items);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

orderItemsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { quantity } = request.body;
  try {
    const item = await OrderItem.findByPk(id);
    if (!item) {
      return response.status(404).json({ error: "Order item not found" });
    }
    item.quantity = quantity;
    await item.save();
    response.status(200).json(item);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = orderItemsRouter;
