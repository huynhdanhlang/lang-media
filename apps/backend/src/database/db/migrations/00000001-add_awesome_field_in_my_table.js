'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

const info = {
    "revision": 1,
    "name": "add-awesome-field-in-my-table",
    "created": "2023-05-10T08:21:33.486Z",
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
                state: '{"revision":1,"tables":{"users":{"tableName":"users","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"fullname":{"seqType":"Sequelize.STRING","allowNull":false},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING","allowNull":true},"phone":{"seqType":"Sequelize.STRING","allowNull":true},"website":{"seqType":"Sequelize.STRING","allowNull":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "users",
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
                "website": {
                    "allowNull": true,
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
        params: ["users"]
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
