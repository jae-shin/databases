var Sequelize = require('sequelize');

var db = new Sequelize('chatter', 'root', 'jae');

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = db.define('Users', {
  name: Sequelize.STRING
});

Users.sync()
  .then(function(err) {
    return Users.findOrCreate({where: {name: 'jaebear'}});
  })
  .spread(function(user, created) {
    return Users.findOrCreate({where: {name: 'greenday'}});
  })
  .spread(function(user, created) {
    return Users.findOrCreate({where: {name: 'youthlagoon'}});
  })
  .spread(function(user, created) {
    return Users.findOrCreate({where: {name: 'thestrokes'}});
  });

var Messages = db.define('Messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

// add a foriegn key 'userId'
Messages.belongsTo(Users, {as: 'user'});

Messages.sync()
  .then(function(err) {
    return Users.findOne({ where: { name: 'jaebear' } });
  })
  .then(function(user) {
    return Messages.findOrCreate({where: {userId: user.id, text: 'yo yo yo', roomname: '944 Market St'}});
  })
  .spread(function() {
    return Users.findOne({ where: { name: 'greenday' } });
  })
  .then(function(user) {
    return Messages.findOrCreate({where: {userId: user.id, text: 'holiday', roomname: 'on stage'}});
  })
  .spread(function() {
    return Users.findOne({ where: { name: 'youthlagoon' } });
  })
  .then(function(user) {
    return Messages.findOrCreate({where: {userId: user.id, text: '17', roomname: 'the lagoon'}});
  })
  .spread(function() {
    return Users.findOne({ where: { name: 'thestrokes' } });
  })
  .then(function(user) {
    return Messages.findOrCreate({where: {userId: user.id, text: 'is this it?', roomname: 'the room on fire'}});
  })
  .spread(function() {
    console.log('finised initializing!');
  });

module.exports.users = Users;
module.exports.messages = Messages;

