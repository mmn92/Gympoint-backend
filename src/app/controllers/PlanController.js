import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { title } = req.body;

    const findPlan = await Plan.findOne({ where: { title } });

    if (findPlan) {
      return res
        .status(401)
        .json({ error: 'There already is a plan with this title' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { title } = req.body;

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'There is no plan with this id' });
    }

    if (title && title !== plan.title) {
      const findPlan = await Plan.findOne({ where: { title } });

      if (findPlan) {
        return res
          .status(401)
          .json({ error: 'There already is a plan with this title' });
      }
    }

    const newPlan = await plan.update(req.body);

    return res.json(newPlan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'There is no plan with this id' });
    }

    const isDeleted = await Plan.destroy({ where: { id: req.params.id } });

    if (!isDeleted) {
      return res.status(500).json({ error: 'Could not delete entry' });
    }

    const { id, title, duration, price } = plan;

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }
}

export default new PlanController();
