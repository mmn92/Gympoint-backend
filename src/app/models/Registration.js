import Sequelize, { Model } from 'sequelize';
import { isBefore, addMonths, endOfDay } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        update_date: Sequelize.VIRTUAL,
        start_date: Sequelize.DATE,
        duration: Sequelize.VIRTUAL,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        price: Sequelize.INTEGER,
        price_month: Sequelize.VIRTUAL,
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            const condition =
              isBefore(new Date(), this.end_date) && this.canceled_at == null;
            return condition;
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(endOfDay(new Date()), endOfDay(this.end_date));
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', registration => {
      registration.price = registration.price_month * registration.duration;
      if (registration.start_date) {
        registration.end_date = addMonths(
          registration.start_date,
          registration.duration
        );
      }
    });

    this.addHook('beforeUpdate', registration => {
      if (registration.price_month) {
        registration.price = registration.price_month * registration.duration;
      }
      if (registration.update_date) {
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
