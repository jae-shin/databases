var Sequelize = require('sequelize');
// var Promise = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var db = new Sequelize('chatter', 'root', 'jae');

module.exports = db;



