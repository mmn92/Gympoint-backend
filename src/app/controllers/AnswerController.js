import Order from '../schemas/Order';

class AnswerController {
  async index(req, res) {
    const orders = await Order.find({
      answer: null,
    });

    return res.json(orders);
  }
}

export default new AnswerController();
