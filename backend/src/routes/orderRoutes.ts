import { orderMachine } from "../machines/orderMachine";
import express from "express";
import { createActor } from "xstate";

const router = express.Router();

const orders = new Map();

router.post("/orders/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const orderService = createActor(orderMachine).start();

  orderService.send({ type: "CREATE", id });

  orders.set(id, orderService);

  res
    .status(201)
    .json({ orderId: id, status: orderService.getSnapshot().context.status });
});

router.post("/orders/:id/approve", (req, res) => {
  const { id } = req.params;
  const orderService = orders.get(id);

  if (!orderService) {
    return res.status(404).json({ error: "Order not found" });
  }

  orderService.send({ type: "APPROVE" });

  res.json({ orderId: id, status: orderService.state.context.status });
});

router.post("/orders/:id/reject", (req, res) => {
  const { id } = req.params;
  const orderService = orders.get(id);

  if (!orderService) {
    return res.status(404).json({ error: "Order not found" });
  }

  orderService.send({ type: "REJECT" });

  res.json({ orderId: id, status: orderService.state.context.status });
});

router.post("/orders/:id/complete", (req, res) => {
  const { id } = req.params;
  const orderService = orders.get(id);

  if (!orderService) {
    return res.status(404).json({ error: "Order not found" });
  }

  orderService.send({ type: "COMPLETE" });

  res.json({ orderId: id, status: orderService.state.context.status });
});

router.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  const orderService = orders.get(id);

  if (!orderService) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json({ orderId: id, status: orderService.state.context.status });
});

export default router;
