import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const { title, duration, price } = req.body;

    const findPlan = await Plan.findOne({ where: { title } });

    if (findPlan) {
      return res
        .status(401)
        .json({ error: 'There already is a plan with this title' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }
}

export default new PlanController();
