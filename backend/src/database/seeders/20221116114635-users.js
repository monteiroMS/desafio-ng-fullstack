module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'joaosilva',
        password: '$2b$06$iVtJTW39BQcGukFGz5EHqOJm9Yq.G5wnb2Yl4fGA3Tkfm.wuPY/pS', //Senha@123
        accountId: 1,
      },
      {
        username: 'marciapereira',
        password: '$2b$06$EgVVBUBjdCe7aDzyg4FIf.XJqt1ZPSCxK32JDuRWSlAayPP3Axb06', //Senha@456
        accountId: 2,
      },
      {
        username: 'pedrolima',
        password: '$2b$06$KP3sR.sIcW5UaGe0xT0mkO1nuM6Sbsdh9XgAEpCKuBP6CD927jdoe', //Senha@789
        accountId: 3,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
