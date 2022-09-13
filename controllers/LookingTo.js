require('dotenv').config();

const LookingTo = require('../models/LookingTo');

class LookingToController {
    async createLT(req, res) {
    try { 
         const  {title,location,JobType,Hours,Sector,Roles} = req.body;
         const lookingTo = new LookingTo({
            title: title,
            location: location,
            JobType: JobType,
            Hours: Hours,
            Sector: Sector,
            Roles: Roles
         });
         await lookingTo.save();
         res.status(200).json({ succes: true});
   
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
      }
}

    async deleteLookingTo(req, res) {
        try{
            await LookingTo(req,res).deleteOne({_id: req.body.id});
            res.status(200).json({success: true});
        } catch (e) {
            console.log(e);
            res.status(500).json({error: e.message});
        }
    }


}

module.exports = new LookingToController