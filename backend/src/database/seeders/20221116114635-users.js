module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'João Silva',
        password: 'ada3c39413b4f6284c8301257812190e', //senha@123
        accountId: 1,
      },
      {
        username: 'Márcia Pereira',
        password: '11c09d17e435b11d069652bc2a469a00', //senha@456
        accountId: 2,
      },
      {
        username: 'Pedro Lima',
        password: '975f04da4b1a492155e42771afa75871', //senha@789
        accountId: 3,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
