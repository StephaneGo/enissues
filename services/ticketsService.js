const e = require("express");

let tickets = [
  { id: 1, titre: "ticket 1", description: "description 1" },
  { id: 2, titre: "ticket 2", description: "description 2" },
  { id: 3, titre: "ticket 3", description: "description 3" },
];
let idx = 4;

exports.findAllTickets = () => {
  return tickets;
};

exports.findTicketById = (id) => {
  return tickets.find((ticket) => ticket.id == id);
};

exports.deleteTicket = (id) => {
  tickets = tickets.filter((ticket) => ticket.id != id);
};

exports.addTicket = (titre, description) => {
  tickets.push({ id: idx++, titre, description });
};

exports.updateTicket = (id, titre, description) => {
  let index = tickets.findIndex((ticket) => ticket.id == id);
  tickets[index] = { id: id, titre, description };
};
