require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const Admin = require('../models/admin');

//access token
const generateUserToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, SECRET, { expiresIn: '30min' });
};

class authController {
  async whoAmI(req, res) {
    try {
      const user = await Admin.findOne({_id: String(req.admin._id)})
      res.status(200).json({ result: user });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
 
  //сюди
  async register(req, res) {
    try {
      if (req.headers['secretkey'] != SECRET) {
        return res
          .status(400)
          .json({ message: 'Invalid secret key' });
      }
      const { name, email, password } = req.body;
      const candidate = await Admin.findOne({ email });
      if (candidate && candidate.verified) {
        res
          .status(400)
          .json({ error: 'Internal error' });
      }
      if (candidate && !candidate.verified) {
        await Admin.deleteOne({ _id: candidate._id });
      } 

      //hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      

      //create user
      const admin = new Admin({
        name,
        email,
        password: passwordHashed,
      });
      await admin.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Admin.findOne({ email: email });
      if (!user) {
        res
          .status(403)
          .json({ error: "Internal error" });
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        res.status(500).json({ error: "Internal error" });
      }
      const token = generateUserToken(user._id);
      res.status(200).json({ token: token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
  async getLibrarySection(req, res) {
    try {
      const section = await LibrarySection.find()
      res.status(200).json({ result: section })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

  async getTicketById(req, res) {
    try {
      const ticket = await Ticket.findOne({ _id: req.query.id })
      if (!ticket) {
        res.status(400).json({ error: "Internal error" })
      }
      res.status(200).json({ result: ticket })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }
  async getTickets(req, res) {
    try {
      const ticket = await Ticket.find({ })
      if (!ticket) {
        res.status(400).json({ error: "Internal error" })
      }
      res.status(200).json({ result: ticket})
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

}

module.exports = new authController();
