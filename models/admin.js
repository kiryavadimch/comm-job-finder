const { Schema, model } = require('mongoose');
const Admin = new Schema({
  
      name: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      tickets:[{type: ObjectId, ref: 'Ticket'}]
});

module.exports = model('Admin', AdminSchema);
