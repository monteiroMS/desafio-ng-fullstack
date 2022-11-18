module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};
