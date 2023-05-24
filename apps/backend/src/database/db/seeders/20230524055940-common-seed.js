'use strict';
const fs = require('fs');
const { uniqBy } = require('lodash');
const categoryJson = fs.readFileSync(__dirname + '\\..\\category.json', 'utf8');
const categoryData = JSON.parse(categoryJson).data;
const videoJson = fs.readFileSync(__dirname + '\\..\\video.json', 'utf8');
const videoData = JSON.parse(videoJson).data;
const { Op } = require('sequelize');
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
    const transaction = await queryInterface.sequelize.transaction();
    const videoDtos = videoData.map((video) => ({
      ...video,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const categoryDtos = categoryData.map((category) => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('video', videoDtos, { transaction });
    await queryInterface.bulkInsert('category', categoryDtos, { transaction });
    const video_category = [];
    await Promise.all([
      queryInterface.select(null, 'video', { transaction }),
      queryInterface.select(null, 'category', { transaction }),
    ]).then(([videos, categorys]) => {
      categorys.forEach((category) => {
        videos.forEach((video) => {
          video_category.push({
            videoId: video.id,
            categoryId: category.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
    });
    await queryInterface.bulkInsert('video_category', video_category, {
      transaction,
    });
    transaction.commit();
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const transaction = await queryInterface.sequelize.transaction();
    const videoNames = videoData.map((video) => video.name);
    const categoryNames = categoryData.map((category) => category.name);
    const videos = await queryInterface.select(null, 'video', {
      where: {
        name: {
          [Op.in]: videoNames,
        },
      },
      transaction,
    });
    const categories = await queryInterface.select(null, 'category', {
      where: {
        name: {
          [Op.in]: categoryNames,
        },
      },
      transaction,
    });
    await queryInterface.bulkDelete(
      'video',
      {
        name: {
          [Op.in]: videoNames,
        },
      },
      { transaction }
    );
    await queryInterface.bulkDelete(
      'category',
      {
        name: {
          [Op.in]: categoryNames,
        },
      },
      { transaction }
    );
    await Promise.all(
      categories.map((category) => {
        videos.map((video) => {
          queryInterface.bulkDelete(
            'video_category',
            {
              videoId: video.id,
              categoryId: category.id,
            },
            { transaction }
          );
        });
      })
    );

    transaction.commit();
  },
};
