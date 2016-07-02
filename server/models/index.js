var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.messages.findAll({
        include: [db.users], 
        where: {userId: db.users.id}
      })
        .catch(function(err) {
          console.log(err);
        })
        .then(function(results) {
          console.log('stringified message results: ', JSON.stringify(results));
          callback(JSON.stringify(results));
        });
    }, // a function which produces all the messages
    post: function (message, callback) {
      var username = message.username;
      db.users.findOrCreate({where: {name: username}})
        .spread(function(user, created) {
          return db.messages.create({
            userId: user.id,
            roomname: message.roomname,
            text: message.message
          });
        })
        .then(function() {
          callback();
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.users.findAll()
        .then(function(users) {
          callback(JSON.stringify(users));
        });
    },
    post: function (username, callback) {
      db.users.findOrCreate({where: {name: username}})
        .spread(function(user, created) {
          callback();
        });
    }
  }
};

