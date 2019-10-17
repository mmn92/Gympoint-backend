import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(
      students.map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      }))
    );
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { id, name, email, age, weight, height } = student;

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async store(req, res) {
    const findStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (findStudent) {
      return res.status(401).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const reqEmail = req.body.email;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    if (reqEmail && reqEmail !== student.email) {
      const findStudent = await Student.findOne({ where: { email: reqEmail } });

      if (findStudent) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    const { id, name, email, age, weight, height } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
