'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "videoId" to table "videouser"
 * addColumn "userId" to table "videouser"
 *
 **/

const info = {
    "revision": 6,
    "name": "re-update video-user model",
    "created": "2023-05-19T10:54:58.795Z",
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
                state: '{"revision":6,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"role":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"categoryId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"tag":{"tableName":"tag","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"fullname":{"seqType":"Sequelize.STRING","allowNull":false},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING","allowNull":true},"phone":{"seqType":"Sequelize.STRING","allowNull":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"video":{"tableName":"video","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"url":{"seqType":"Sequelize.STRING","allowNull":false},"description":{"seqType":"Sequelize.STRING"},"trailerUrl":{"seqType":"Sequelize.STRING"},"language":{"seqType":"Sequelize.STRING","allowNull":false},"country":{"seqType":"Sequelize.STRING","allowNull":false},"view":{"seqType":"Sequelize.INTEGER"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"videoId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"videouser":{"tableName":"videouser","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"videoId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"video","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "addColumn",
        params: [
            "videouser",
            "videoId",
            {
                "onDelete": "NO ACTION",
                "onUpdate": "CASCADE",
                "references": {
                    "model": "video",
                    "key": "id"
                },
                "allowNull": true,
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "videouser",
            "userId",
            {
                "onDelete": "NO ACTION",
                "onUpdate": "CASCADE",
                "references": {
                    "model": "user",
                    "key": "id"
                },
                "allowNull": true,
                "type": Sequelize.INTEGER
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
        fn: "removeColumn",
        params: ["videouser", "videoId"]
    },
    {
        fn: "removeColumn",
        params: ["videouser", "userId"]
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
