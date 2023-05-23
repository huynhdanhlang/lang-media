'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "video_categories"
 * createTable "video_category", deps: [category, video]
 * addIndex "video_category_video_id_category_id" to table "video_category"
 *
 **/

const info = {
    "revision": 10,
    "name": "try fix n-to-n relationship",
    "created": "2023-05-23T03:26:12.818Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":10,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"role":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"tag":{"tableName":"tag","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"videoId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"fullname":{"seqType":"Sequelize.STRING","allowNull":false},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING","allowNull":true},"phone":{"seqType":"Sequelize.STRING","allowNull":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"video":{"tableName":"video","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"url":{"seqType":"Sequelize.STRING","allowNull":false},"description":{"seqType":"Sequelize.STRING"},"trailerUrl":{"seqType":"Sequelize.STRING"},"language":{"seqType":"Sequelize.STRING","allowNull":false},"country":{"seqType":"Sequelize.STRING","allowNull":false},"view":{"seqType":"Sequelize.INTEGER"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"video_category":{"tableName":"video_category","schema":{"categoryId":{"seqType":"Sequelize.INTEGER","unique":"video_category_videoId_categoryId_unique","primaryKey":true,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"videoId":{"seqType":"Sequelize.INTEGER","unique":"video_category_videoId_categoryId_unique","primaryKey":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{"9c0defe843110a12b6023b5c953a87a38f5ef604":{"name":"video_category_video_id_category_id","type":"","unique":true,"fields":["videoId","categoryId"],"options":{"indexName":"video_category_video_id_category_id","type":"UNIQUE"}}}}}}'
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["video_categories"]
    },

    {
        fn: "createTable",
        params: [
            "video_category",
            {
                "categoryId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "video_category_videoId_categoryId_unique",
                    "type": Sequelize.INTEGER
                },
                "videoId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "video",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "video_category_videoId_categoryId_unique",
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "video_category",
            ["videoId", "categoryId"],
            {
                "indexName": "video_category_video_id_category_id",
                "type": "UNIQUE"
            }
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["video_category"]
    },

    {
        fn: "createTable",
        params: [
            "video_categories",
            {
                "categoryId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "video_categories_videoId_categoryId_unique",
                    "type": Sequelize.INTEGER
                },
                "videoId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "video",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "video_categories_videoId_categoryId_unique",
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "video_categories",
            ["videoId", "categoryId"],
            {
                "indexName": "video_categories_video_id_category_id",
                "type": "UNIQUE"
            }
        ]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
