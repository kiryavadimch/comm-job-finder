require('dotenv').config();
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
         res.status(403).json({ message: 'User is not logged in' });
      }

      const {id:id} = jwt.verify(token, secret);
      // console.log(id)
      const admin = await Admin.findOne({_id:String(id)},'-password')
      // console.log(admin)
      if (!admin) {
         return res
            .status(403)
            .json({ message: 'User does not have sufficient permissions' });
      }
      req.admin = admin
      next();
   } catch (e) {
      console.log(e);
      res.status(403).json({ message: 'token expired' });
   }
};

