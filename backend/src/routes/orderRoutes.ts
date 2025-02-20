import express from "express";
import { createActor } from "xstate";
import { orderMachine } from "../machines/orderMachine.js";

const router = express.Router();

const orderActors = new Map();

// Create order
router.post("/orders", (req, res) => {
  const { id, amount, customerEmail } = req.body;

  const actor = createActor(orderMachine);
  actor.subscribe((state) => {
    console.log(`Order ${id} state:`, state.value);
  });

  actor.start();
  orderActors.set(id, actor);

  actor.send({
    type: "CREATE",
    order: { id, amount, customerEmail },
  });

  res.json({ message: "Order created", id });
});

// Get order status
router.get("/orders/:id", (req, res) => {
  const actor = orderActors.get(req.params.id);
  if (!actor) {
    return res.status(404).json({ error: "Order not found" });
  }

  const state = actor.getSnapshot();
  res.json({
    status: state.value,
    order: state.context.order,
  });
});

// Approve order
router.post("/orders/:id/approve", (req, res) => {
  const actor = orderActors.get(req.params.id);
  if (!actor) {
    return res.status(404).json({ error: "Order not found" });
  }

  actor.send({ type: "APPROVE" });
  res.json({ message: "Order approved" });
});

// Complete order
router.post("/orders/:id/complete", (req, res) => {
  const actor = orderActors.get(req.params.id);
  if (!actor) {
    return res.status(404).json({ error: "Order not found" });
  }

  actor.send({ type: "COMPLETE" });
  res.json({ message: "Order completed" });
});

export default router;
