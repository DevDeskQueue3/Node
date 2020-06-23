const express = require("express");
const router = express.Router();
const Tickets = require("./ticket-model.js");

router.get("/", async (req, res) => {
  const { status } = req.query;

  if (req.query.status) {
    try {
      const tickets = await Tickets.findBy({ status });
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    try {
      const tickets = await Tickets.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

router.post("/", async (req, res, next) => {
  const userID = req.jwt.id;
  const { title, description, what_ive_tried, categories } = req.body;
  if (!(title && description))
    return next({
      code: 400,
      message: "Please provide a title and description",
    });

  try {
    const ticket = await Tickets.add(
      {
        posted_by: userID,
        title,
        description,
        what_ive_tried,
      },
      categories
    );
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem creating the ticket" });
  }
});

router.put("/:id", async (req, res, next) => {
  const userID = req.jwt.id;
  const ticketID = req.params.id;
  const { title, description, what_ive_tried } = req.body;

  if (!(title && description))
    return next({
      code: 400,
      message: "Please provide a title and description",
    });

  try {
    const changes = { title, description, what_ive_tried };
    const [ticket] = await Tickets.update(changes, ticketID, userID);
    // TODO: handle attempting to update another user's ticket
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem updating the ticket" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const ticketID = req.params.id;
  const userID = req.jwt.id;
  try {
    const count = await Tickets.remove(ticketID, userID);
    if (!count) return next({ code: 404, message: "Ticket not found" });
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem deleting the ticket" });
  }
});

router.get("/:id", async (req, res) => {
  const ticketID = req.params.id;

  try {
    const tickets = await Tickets.findById(ticketID);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id/comments", async (req, res) => {
  const ticketID = req.params.id;

  try {
    const tickets = await Tickets.findByIdWithComments(ticketID);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
