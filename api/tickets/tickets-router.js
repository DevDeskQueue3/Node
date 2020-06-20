const express = require("express");
const router = express.Router();
const Tickets = require("./ticket-model.js");

router.get("/", async (req, res) => {
  try {
    const tickets = await Tickets.find();
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res, next) => {
  const { id } = req.jwt;
  const { title, description } = req.body;
  if (!(title && description))
    return next({
      code: 400,
      message: "Please provide a title and description",
    });

  try {
    const ticket = await Tickets.add({ title, description, postedBy: id });
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem creating the ticket" });
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
