import { endOfDay, parseISO, isBefore, isSameDay, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    const activeRegistrations = registrations.filter(
      registration => registration.active
    );

    return res.json(activeRegistrations);
  }

  async store(req, res) {
    const { student_id, plan_id, date } = req.body;

    const findStudent = await Student.findByPk(student_id, {
      include: [
        {
          model: Registration,
          as: 'registration',
          attributes: ['end_date', 'active'],
        },
      ],
    });

    if (!findStudent) {
      return res.status(401).json({ error: 'Invalid student' });
    }

    const findPlan = await Plan.findByPk(plan_id);

    if (!findPlan) {
      return res.status(401).json({ error: 'Invalid plan' });
    }

    if (findStudent.registration && findStudent.registration.active) {
      return res
        .status(401)
        .json({ error: 'Student already has an active registration' });
    }

    const price = findPlan.duration * findPlan.price;

    const parsed = endOfDay(parseISO(date));
    const before =
      isBefore(parsed, endOfDay(new Date())) ||
      isSameDay(parsed, endOfDay(new Date()));

    if (before) {
      return res
        .status(400)
        .json({ error: 'Your starting date must be a day in the future' });
    }

    const { id, start_date, end_date } = await Registration.create({
      student_id,
      plan_id,
      start_date: parsed,
      end_date: addMonths(parsed, findPlan.duration),
      price,
    });

    await findStudent.update({
      registration_id: id,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }
}

export default new RegistrationController();
