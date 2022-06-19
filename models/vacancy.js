const { model, Schema } = require('mongoose');

const Vacancy = new Schema(
  {
    companyName: { type: String, required: true },
    status: { type: String, default: 'Hidden' },
    show: Boolean,
    companyLogo: String,
    position: String,
    location: String,
    workHours: String,
    volunteeringType: String,
    description: String,
    willingRelocate: Boolean,
    workRemotely: Boolean,
    incentives: [String],
    skills: [String],
    benefits: [String],
  },
  { timestamps: true }
);

module.exports = model('Vacancy', Vacancy);