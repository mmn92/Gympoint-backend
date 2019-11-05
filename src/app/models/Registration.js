import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        // student_id: Sequelize.INTEGER,
        // plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), this.end_date);
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
