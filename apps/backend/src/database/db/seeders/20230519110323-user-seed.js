'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      const user = await queryInterface.select(null, 'user', {
        where: {
          username: 'huynhdanhlang',
        },
        transaction,
      });
      if (user.length) return;
      await queryInterface.bulkInsert(
        'user',
        [
          {
            username: 'huynhdanhlang',
            password: '12345678',
            fullname: 'Huynh Danh Lang',
            email: 'danhlangbmvl@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(
        'user',
        {
          username: 'huynhdanhlang',
        },
        { transaction }
      );
    });
  },
};
