import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(
      users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    );
  }

  async store(req, res) {
    const findUser = await User.findOne({ where: { email: req.body.email } });

    if (findUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
