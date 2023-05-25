'use strict';
const fs = require('fs');
const categoryJson = fs.readFileSync(__dirname + '\\..\\category.json', 'utf8');
const categoryData = JSON.parse(categoryJson).data;
const videoJson = fs.readFileSync(__dirname + '\\..\\video.json', 'utf8');
const videoData = JSON.parse(videoJson).data;
const tagJson = fs.readFileSync(__dirname + '\\..\\tag.json', 'utf8');
const tagData = JSON.parse(tagJson).data;
const roleJson = fs.readFileSync(__dirname + '\\..\\role.json', 'utf8');
const roleData = JSON.parse(roleJson).data;
const { Op } = require('sequelize');
const { mapTimeDataDto } = require('../../../helper/seed');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      /**
       * Seed for video/category/video_category
       */
      const videoDtos = mapTimeDataDto(videoData);
      const categoryDtos = mapTimeDataDto(categoryData);
      await queryInterface.bulkInsert('video', videoDtos, { transaction });
      await queryInterface.bulkInsert('category', categoryDtos, {
        transaction,
      });
      const video_category = [];
      await Promise.all([
        queryInterface.select(null, 'video', { transaction }),
        queryInterface.select(null, 'category', { transaction }),
      ]).then(([videos, categories]) => {
        categories.forEach((category) => {
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

      /**
       * Seed for tag
       */
      const tagDtos = mapTimeDataDto(tagData);
      await queryInterface.bulkInsert('tag', tagDtos, { transaction });

      /**
       * Seed for role
       */
      const roleDtos = mapTimeDataDto(roleData);
      await queryInterface.bulkInsert('role', roleDtos, { transaction });
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
    });
  },
};
