'use strict';

const { genSaltSync, hash } = require('bcrypt');

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
      const role = await queryInterface.select(null, 'role', {
        where: {
          name: 'customer',
        },
        transaction,
      });
      const salt = genSaltSync(process.env.HASH_NUMBER);
      const passwordHashed = await hash('123456', salt);
      await queryInterface.bulkInsert(
        'user',
        [
          {
            username: 'huynhdanhlang',
            password: passwordHashed,
            fullname: 'Huynh Danh Lang',
            email: 'danhlangbmvl@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            roleId: role[0].id,
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
