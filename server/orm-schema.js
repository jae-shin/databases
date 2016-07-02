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
    return Users.bulkCreate([
      {name: 'jaebear'}, 
      {name: 'greenday'}, 
      {name: 'youthlagoon'}, 
      {name: 'thestrokes'}
    ]);
  });

var Messages = db.define('Messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

// add a foriegn key 'userId'
Messages.belongsTo(Users, {as: 'user'});

Messages.sync()
  .then(function(err) {
    Users.findOne({ where: { name: 'jaebear' } })
      .then(function(user) {
        Messages.create({userId: user.id, text: 'yo yo yo', roomname: '944 Market St'});
      });
    Users.findOne({ where: { name: 'greenday' } })
      .then(function(user) {
        Messages.create({userId: user.id, text: 'holiday', roomname: 'on stage'});
      });
    Users.findOne({ where: { name: 'youthlagoon' } })
      .then(function(user) {
        Messages.create({userId: user.id, text: '17', roomname: 'the lagoon'});
      });
    Users.findOne({ where: { name: 'thestrokes' } })
      .then(function(user) {
        Messages.create({userId: user.id, text: 'is this it?', roomname: 'the room on fire'});
      });
  });

