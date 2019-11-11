import Order from '../schemas/Order';

class AnswerController {
  async index(req, res) {
    const orders = await Order.find({
      answer: null,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const { answer } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        answer,
        answeredAt: new Date(),
      },
      { new: true }
    );

    return res.json(order);
  }
}

export default new AnswerController();
