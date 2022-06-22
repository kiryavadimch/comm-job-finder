const { Schema, model, ObjectId } = require('mongoose');

const Company = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: Boolean,
  resetLink: String,
  emailToken: String,

  companyName: { type: String, unique: true },
  avatar: String,
  title: String,
  location: String,

  phone: String,
  websites: [String],

  description: String,

  //   industry: { industryId: ObjectId, ref: 'Industry' },
  //   companyType: { companyTypeId: ObjectId, ref: 'CompanyType' },
  address: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: Number,

  vacancies: [{type: ObjectId, ref: 'Vacancy'}],
  sportVacancies: [{type: ObjectId, ref: 'SportVacancy'}],

  // subscriptions: [
  //   {
  //     title: { type: String, required: true },
  //     subtitle: { type: String, required: true },
  //     price: { type: Number, required: true },
  //     profits: [{ type: String, required: true }],
  //     trial: { type: Number, required: true },
  //   },
  // ],
});

module.exports = model('Company', Company);
