module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'registration_id', {
      type: Sequelize.INTEGER,
      references: { model: 'registrations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'registration_id');
  },
};
