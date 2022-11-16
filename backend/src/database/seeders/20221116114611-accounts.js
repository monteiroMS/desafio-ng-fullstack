module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Accounts', [
      {
        balance: 150,
      },
      {
        balance: 250,
      },
      {
        balance: 50,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
