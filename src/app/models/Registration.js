import Sequelize, { Model } from 'sequelize';
import { isBefore, addMonths } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        duration: Sequelize.VIRTUAL,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
        price_month: Sequelize.VIRTUAL,
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

    this.addHook('beforeSave', async registration => {
      registration.price = registration.price_month * registration.duration;
      if (registration.start_date) {
        registration.end_date = addMonths(
          registration.start_date,
          registration.duration
        );
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
