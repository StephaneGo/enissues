var express = require("express");
var { body, validationResult } = require("express-validator");
var ticketsService = require("../services/ticketsService");

var router = express.Router();

router.get("/", async (req, res) => {
  res.render("index", { tickets: await ticketsService.findAllTickets() });
});

// Ajouter un ticket
router.post(
  "/",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
  async (req, res) => {
    const { titre, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const tickets = await ticketsService.findAllTickets();
      res.render("index", {
        tickets: tickets,
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }

    ticketsService.addTicket(titre, description);

    res.redirect("/");
  }
);

router.get("/:id/modifier", async (req, res) => {
  const { id } = req.params;
  const ticket = await ticketsService.findTicketById(id);
  res.render("modifier-ticket", { ticket });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ticket = await ticketsService.findTicketById(id);
  res.render("detail-ticket", { ticket });
});

router.post(
  "/:id/modifier",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("modifier-ticket", {
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }
    const { id } = req.params;
    const { titre, description } = req.body;
    await ticketsService.updateTicket(id, titre, description);
    res.redirect("/");
  }
);

router.get("/:id/supprimer", async (req, res) => {
  const { id } = req.params;
  await ticketsService.deleteTicket(id);
  res.redirect("/");
});

module.exports = router;
