const ordersRouter = require("express").Router();
const { Order } = require("../models");

ordersRouter.post("/", async (req, res) => {
  const { user_id, total } = req.body;

  if (user_id === undefined || total === undefined) {
    return res.status(400).json({ error: "user_id and total are required" });
  }

  try {
    const newOrder = await Order.create({ user_id, total });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

ordersRouter.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({ where: { user_id: userId } });
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ error: "No orders found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

ordersRouter.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { total } = req.body;

  if (total === undefined) {
    return res.status(400).json({ error: "total is required" });
  }

  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (order) {
      order.total = total;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "No order found with this ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = ordersRouter;
