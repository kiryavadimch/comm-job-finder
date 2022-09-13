const { Schema, model, ObjectId } = require('mongoose');
const AdminSchema = new Schema({
      name: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      tickets:[{type: ObjectId, ref: 'Ticket'}]
});

module.exports = model('Admin', AdminSchema);
