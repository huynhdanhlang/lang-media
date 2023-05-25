'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 * createTable "role", deps: []
 * createTable "video", deps: []
 * createTable "tag", deps: [video]
 * createTable "user", deps: [role]
 * createTable "video_category", deps: [category, video]
 * addIndex "video_category_video_id_category_id" to table "video_category"
 *
 **/

const info = {
    "revision": 1,
    "name": "re-init",
    "created": "2023-05-24T09:13:44.812Z",
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
                state: '{"revision":1,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"role":{"tableName":"role","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"tag":{"tableName":"tag","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"videoId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"fullname":{"seqType":"Sequelize.STRING","allowNull":false},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING","allowNull":true},"phone":{"seqType":"Sequelize.STRING","allowNull":true},"roleId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"role","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"video":{"tableName":"video","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"url":{"seqType":"Sequelize.STRING","allowNull":false},"description":{"seqType":"Sequelize.STRING"},"trailerUrl":{"seqType":"Sequelize.STRING"},"language":{"seqType":"Sequelize.STRING","allowNull":false},"country":{"seqType":"Sequelize.STRING","allowNull":false},"view":{"seqType":"Sequelize.INTEGER"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"video_category":{"tableName":"video_category","schema":{"categoryId":{"seqType":"Sequelize.INTEGER","unique":"video_category_videoId_categoryId_unique","primaryKey":true,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"videoId":{"seqType":"Sequelize.INTEGER","unique":"video_category_videoId_categoryId_unique","primaryKey":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{"9c0defe843110a12b6023b5c953a87a38f5ef604":{"name":"video_category_video_id_category_id","type":"","unique":true,"fields":["videoId","categoryId"],"options":{"indexName":"video_category_video_id_category_id","type":"UNIQUE"}}}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "category",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
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
        fn: "createTable",
        params: [
            "role",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
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
        fn: "createTable",
        params: [
            "video",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "url": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "description": {
                    "type": Sequelize.STRING
                },
                "trailerUrl": {
                    "type": Sequelize.STRING
                },
                "language": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "country": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "view": {
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
        fn: "createTable",
        params: [
            "tag",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "videoId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "video",
                        "key": "id"
                    },
                    "allowNull": true,
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
        fn: "createTable",
        params: [
            "user",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "username": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "password": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "fullname": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "email": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "address": {
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "phone": {
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "roleId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "role",
                        "key": "id"
                    },
                    "allowNull": true,
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
        params: ["tag"]
    },
    {
        fn: "dropTable",
        params: ["user"]
    },
    {
        fn: "dropTable",
        params: ["video_category"]
    },
    {
        fn: "dropTable",
        params: ["category"]
    },
    {
        fn: "dropTable",
        params: ["role"]
    },
    {
        fn: "dropTable",
        params: ["video"]
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