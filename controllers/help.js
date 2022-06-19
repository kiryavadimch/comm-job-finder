require('dotenv').config();

const Company = require('../models/company');
const Volunteer = require('../models/company');
const Ticket = require('../models/ticket');

const nodemailer = require('nodemailer');

//transporter
let mailTransporter = nodemailer.createTransport({
   service: 'hotmail',
   auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
   },
});

class helpController {
   async createTicket(req, res) {
      try {
         const { email, name, text } = req.body
         let details = {
            from: email,
            to: process.env.AUTH_EMAIL,
            subject: `Ticket from ${name}`,
            html: text,
         };
         let ticket = {}
         if (req.volunteer) {
            ticket = new Ticket({
               name, email, text, creator_volunteer: req.volunteer, details: details
            })
         }
         if (req.company) {
            ticket = new Ticket({
               name, email, text, creator_volunteer: req.volunteer, details: details
            })
         }
         mailTransporter.sendMail(details, (err) => {
            if (err) {
               res.status(500).json({ error: 'Internal error' });
            }
         });
         await ticket.save()
         res.status(200).json({ success: true })
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }

   async getTickets(req, res) {
      try {
         const tickets = await Ticket.find({})
         res.status(200).json({ result: tickets })
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }

   async sendAnswer(req, res) {
      try {
         const { text, ticket } = req.body
         const subject = await Ticket.findOne({ _id: ticket })
         let details = {
            from: process.env.AUTH_EMAIL,
            to: subject.email,
            subject: `Hi ${subject.name}!`,
            html: `<p>Your ticket is:</p><p>${subject.text}</p><p>${text}</p>`,
         };
         mailTransporter.sendMail(details, (err) => {
        if (err) {
          res.status(500).json({ error: 'Internal error' });
        }
      });
         res.status(200).json({ success: true })
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }
}

module.exports = new helpController();