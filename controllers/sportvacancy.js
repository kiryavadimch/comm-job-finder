const SportVacancy = require('../models/sportvacancy');

class sportvacancyController {
  async createSportVacancy(req, res) {
    try {
      const {
        status,
        position,
        location,
        workHours,
        volunteeringType,
        description,
        willingRelocate,
        workRemotely,
        incentives,
        skills,
        benefits,
      } = req.body;
      const sportVacancy = new SportVacancy({
        status: status,
        companyName: req.company.name,
        companyLogo: req.company.avatar,
        position,
        location,
        workHours,
        volunteeringType,
        description,
        willingRelocate,
        workRemotely,
        incentives,
        skills,
        benefits,
      });
      await sportVacancy.save();
      req.company.sportVacancies.push(sportVacancy._id)
      await req.company.save()
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async getVacancies(req, res) {
    try {
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      if (!skip || !limit) {
        res.status(400).json({ error: 'Internal error' })
      }
      const vacancies = await SportVacancy.find({ /**status: 'Active' */ }).skip(skip).limit(limit);
      res.status(200).json({ result: vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async getSportVacanciesWithDraws(req, res) {
    try {
      const vacancies = await SportVacancy.find({});
      res.status(200).json({ result: vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async updateSportVacancy(req, res) {
    try {
      let candidate = await SportVacancy.findById(req.body.sportvacancy);
      if (!candidate) {
        res.status(400).json({ error: 'Internal error' });
      }
      candidate.set(req.body);
      await candidate.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async deleteSportVacancy(req, res) {
    try {
      await SportVacancy.deleteOne({ _id: req.body.id });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async setStatus(req, res) {
    try {
      const sportvacancy = await SportVacancy.findOne({ _id: req.body.id });
      if (!vacancy) {
        res.status(400).json({ error: 'Internal error' });
      }
      sportvacancy.status = req.body.status;
      await sportvacancy.save()
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async addToFavorite(req, res) {
    try {
      if (req.volunteer.favorites.includes(req.body.id)) {
        res.status(400).json({ error: 'Internal error' })
      }
      req.volunteer.favorites.push(req.body.id)
      await req.volunteer.save()
      res.status(200).json({ success: true })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

  async removeFromFavorite(req, res) {
    try {
      if (!req.volunteer.favorites.includes(req.body.id)) {
        res.status(400).json({ error: 'Internal error' })
      }
      for (let i = 0; i < req.volunteer.favorites.length; i++) {
        // console.log(volunteer.favorites[i])
        if (req.volunteer.favorites[i].equals(req.body.id
        )) {
          // console.log('ok')
          req.volunteer.favorites.splice(i, 1)
        }
      }
      await req.volunteer.save()
      res.status(200).json({ success: true })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

  async getFavorites(req, res) {
    try {
      res.status(200).json({ result: req.volunteer.favorites })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }
}

module.exports = new sportvacancyController();
