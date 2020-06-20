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
  const userID = req.jwt.id;
  const { title, description } = req.body;
  if (!(title && description))
    return next({
      code: 400,
      message: "Please provide a title and description",
    });

  try {
    const [ticket] = await Tickets.add({
      postedBy: userID,
      title,
      description,
    });
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem creating the ticket" });
  }
});

router.put("/:id", async (req, res, next) => {
  const userID = req.jwt.id;
  const ticketID = req.params.id;
  const { title, description } = req.body;
  if (!(title && description))
    return next({
      code: 400,
      message: "Please provide a title and description",
    });

  try {
    const [ticket] = await Tickets.update(
      {
        title,
        description,
      },
      ticketID,
      userID
    );
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem updating the ticket" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const ticketId = req.params.id;
  const userID = req.jwt.id;
  try {
    const count = await Tickets.remove(ticketId, userID);
    if (!count) return next({ code: 404, message: "Ticket not found" });
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    next({ code: 500, message: "There was a problem deleting the ticket" });
  }
});

module.exports = router;
