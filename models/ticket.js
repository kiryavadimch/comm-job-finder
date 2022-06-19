const { Schema, model, ObjectId } = require('mongoose');

const Ticket = new Schema(
   {
      name: String,
      email: String,
      text: String,
      creator_volunteer: { type: ObjectId, ref: 'Volunteer' },
      creator_company: { type: ObjectId, ref: 'Company'},
      details: Object,
   }
)

module.exports = model('Ticket', Ticket)