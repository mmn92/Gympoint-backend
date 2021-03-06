import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }
    const { email, password } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({ error: 'User does not exits' });
    }

    if (!(await findUser.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const { id, name } = findUser;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
