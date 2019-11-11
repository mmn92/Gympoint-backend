import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Order from '../schemas/Order';
import Mail from '../../lib/Mail';
import Student from '../models/Student';

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

    const student = await Student.findByPk(order.student);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Nova resposta',
      template: 'answered',
      context: {
        student: student.name,
        question: order.question,
        answer: order.answer,
        date: format(order.answeredAt, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });

    return res.json(order);
  }
}

export default new AnswerController();
