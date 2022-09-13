const { Schema , model , ObjectId }  = require('mongoose');

const LookingTo = new Schema(
    {
    title: String,
    location: String,
    JobType:{type:ObjectId, ref: 'JobType'},
    Hours:{type:ObjectId, ref: 'Hours'},
    Sector:{type:ObjectId, ref: 'Sector'},
    Roles:{type:ObjectId, ref: 'SectorRoles'},

    }
  )
  
  module.exports = model('LookingTo', LookingTo)