const vacancy = require('../models/vacancy');
const Vacancy = require('../models/vacancy');

class vacancyController {
  async createVacancy(req, res) {
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
        city,
        state,
        zipCode,
      } = req.body;
      const vacancy = new Vacancy({
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
        city,
        state,
        zipCode,
      });
      await vacancy.save();
      req.company.vacancies.push(vacancy._id)
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
      const vacancies = await Vacancy.find({}).skip(skip).limit(limit)

      res.status(200).json({ result: vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async getVacanciesByFilters(req, res) {       //zipCode/City/State
    try {
      let params = {}
      req.query.city ? console.log('city = ', req.query.city) : {}
      req.query.zipCode ? console.log('zipCode = ', req.query.zipCode) : {}
      req.query.state ? console.log('state = ', req.query.state) : {}

      req.query.zipCode ? params.zipCode = { $regex: req.query.zipCode, $options: 'i' } : {}
      req.query.state ? params.state = { $regex: req.query.state, $options: 'i' } : {}
      req.query.city ? params.city = { $regex: req.query.city, $options: 'i' } : {}

      console.log(params)
      const vacancies = await Vacancy.find(params)

      res.status(200).json({ result: vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async getVacanciesWithDraws(req, res) {
    try {
      const vacancies = await Vacancy.find({});
      res.status(200).json({ result: vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async updateVacancy(req, res) {
    try {
      let candidate = await Vacancy.findOne(req.body.vacancy);
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

  async deleteVacancy(req, res) {
    try {
      await Vacancy.deleteOne({ _id: req.body.id });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async setStatus(req, res) {
    try {
      const vacancy = await Vacancy.findOne({ _id: req.body.id });
      if (!vacancy) {
        res.status(400).json({ error: 'Internal error' });
      }
      vacancy.status = req.body.status;
      await vacancy.save()
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



module.exports = new vacancyController();
