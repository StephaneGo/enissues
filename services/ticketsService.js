const e = require("express");
const mongoose = require("mongoose");
const Ticket = require("../models/ticket");

exports.findAllTickets = async () => {
  const tickets = await Ticket.find().lean();
  return tickets;
};

exports.findTicketById = async (id) => {
  const ticket = await Ticket.findById(id);
  return ticket;
};

exports.deleteTicket = async (id) => {
  await Ticket.findByIdAndDelete(id);
};

exports.addTicket = async (titre, description) => {
  try{
    await Ticket.create({ titre, description });
  } catch (error) {   
    console.log("Erreur à l'ajout du ticket", error);
    throw error;
  }
};

exports.updateTicket = async (id, titre, description) => {
  const ticket = await Ticket.findById(id);
  ticket.titre = titre;
  ticket.description = description;
  await ticket.save();
};
