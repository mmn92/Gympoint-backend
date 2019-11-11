import Order from '../schemas/Order';
import Student from '../models/Student';

class OrderController {
  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(401).json({ error: 'You have to write a message' });
    }

    const order = await Order.create({
      student: req.params.id,
      question: message,
    });

    return res.json(order);
  }
}

export default new OrderController();
