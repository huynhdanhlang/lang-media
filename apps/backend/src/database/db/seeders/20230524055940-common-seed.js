'use strict';
const fs = require('fs');
const { mapTimeDataDto } = require('../../../helper/seed');
const categoryJson = fs.readFileSync(__dirname + mapTimeDataDto('category.json'), 'utf8');
const categoryData = JSON.parse(categoryJson).data;
const videoJson = fs.readFileSync(__dirname + mapTimeDataDto('video.json'), 'utf8');
const videoData = JSON.parse(videoJson).data;
const tagJson = fs.readFileSync(__dirname + mapTimeDataDto('tag.json'), 'utf8');
const tagData = JSON.parse(tagJson).data;

const { Op } = require('sequelize');
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

      /**
       * Seed for tag
       */
      const tagDtos = mapTimeDataDto(tagData);
      await queryInterface.bulkInsert('tag', tagDtos, { transaction });

      // connect relation
      const video_category = [];
      const tag_video = [];
      await Promise.all([
        queryInterface.select(null, 'video', { transaction }),
        queryInterface.select(null, 'category', { transaction }),
        queryInterface.select(null, 'tag', { transaction }),
      ]).then(([videos, categories, tags]) => {
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

        videos.forEach((video) => {
          tags.forEach((tag) => {
            tag_video.push({
              videoId: video.id,
              tagId: tag.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          });
        });
      });
      await Promise.all([
        queryInterface.bulkInsert('video_category', video_category, {
          transaction,
        }),
        queryInterface.bulkInsert('tag_video', tag_video, {
          transaction,
        }),
      ]);
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
      const tagNames = tagData.map((tag) => tag.name);
      const roleNames = roleData.map((role) => role.name);
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
      await queryInterface.bulkDelete(
        'tag',
        {
          name: {
            [Op.in]: tagNames,
          },
        },
        { transaction }
      );
    });
  },
};
