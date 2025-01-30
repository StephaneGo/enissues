const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  titre: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
