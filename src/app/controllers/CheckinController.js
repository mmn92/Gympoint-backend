import { addDays } from 'date-fns';

import Checkin from '../schemas/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Invalid student ID' });
    }

    const checkins = await Checkin.find({
      student: req.params.id,
    })
      .select({
        _id: 1,
        student: 1,
        createdAt: 1,
      })
      .sort({ createdAt: 'desc' });

    return res.json(checkins);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Invalid student ID' });
    }

    const lastCheckins = await Checkin.find({
      student: req.params.id,
      createdAt: {
        $gte: addDays(new Date(), -7),
      },
    });

    if (lastCheckins.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Student cant checkin more than 5 times in 7 days' });
    }

    const checkin = await Checkin.create({
      student: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
