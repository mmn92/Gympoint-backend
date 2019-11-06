import { endOfDay, parseISO, isBefore, isSameDay } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'canceled_at',
      ],
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
      registration => registration.active && !registration.canceled_at
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
          attributes: ['end_date', 'active', 'canceled_at'],
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

    const parsed = endOfDay(parseISO(date));
    const before =
      isBefore(parsed, endOfDay(new Date())) ||
      isSameDay(parsed, endOfDay(new Date()));

    if (before) {
      return res
        .status(400)
        .json({ error: 'Your starting date must be a day in the future' });
    }

    const { id, start_date, end_date, price } = await Registration.create({
      student_id,
      plan_id,
      start_date: parsed,
      duration: findPlan.duration,
      price_month: findPlan.price,
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

  async update(req, res) {
    const findRegistration = await Registration.findByPk(req.params.id);

    if (!findRegistration) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    if (!findRegistration.active) {
      return res
        .status(401)
        .json({ error: 'You cant update an inactive registration' });
    }

    const { plan_id } = req.body;

    const findPlan = await Plan.findByPk(plan_id);

    const updated = await findRegistration.update({
      plan_id,
      update_date: true,
      start_date: new Date(),
      duration: findPlan.duration,
      price_month: findPlan.price,
    });

    return res.json(updated);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id, {
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

    if (!registration) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    if (!registration.cancelable) {
      return res
        .status(401)
        .json({ error: 'Registration is already cancelled' });
    }

    await registration.update({
      canceled_at: new Date(),
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
