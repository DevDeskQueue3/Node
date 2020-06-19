const express = require("express");
const router = express.Router();
const Tickets = require("./ticket-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, async (req, res) => {
  try {
    const tickets = await Tickets.find();
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const newTicket = req.body;
  try {
    const tickets = await Tickets.add(newTicket);
    res.status(201).json(tickets);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const ticketId = req.params.id;
  try {
    const tickets = await Tickets.remove(ticketId);
    res.status(201).json(tickets);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
