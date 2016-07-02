var db = require('../db');
var orm = require('../orm-schema');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, results) {
        if (err) {
          throw err;
        } else {
          var asyncLoop = function(i) {
            if (i < results.length) {
              db.query('SELECT name FROM users WHERE id = ?', [results[i].userId], function(err, userRows) {
                if (err) {
                  throw err;
                } 
                if (userRows.length > 0) {
                  results[i].username = userRows[0].name;
                }
                asyncLoop(i + 1);
              });
            } else {
              callback(JSON.stringify(results));
            }
          };
          asyncLoop(0);
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      var username = message.username;
      orm.users.findOrCreate({where: {name: username}})
        .spread(function(user, created) {
          console.log('user for message post is: ', user);
          console.log('message created: ', created);
          return orm.messages.create({
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
      db.query('SELECT * FROM users', function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(JSON.stringify(results));
        }
      });
    },
    post: function (username, callback) {
      orm.users.findOrCreate({where: {name: username}})
        .spread(function(user, created) {
          console.log(user.get());
          console.log('created');
          callback();
        });
    }
  }
};

