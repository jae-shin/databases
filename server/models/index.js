var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(JSON.stringify(results));
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      var username = message.username;
      db.query('SELECT id FROM users WHERE name = ?', [username], function(err, results) {
        if (err) { 
          throw err; 
        } else {
          var queryArgs = {
            userId: results[0].id,
            roomname: message.roomname,
            text: message.message
          };
          db.query('INSERT INTO messages SET ?', queryArgs, function(err, results) {
            if (err) {
              throw err;
            }
            callback();
          });
        }
        callback();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username, callback) {
      db.query('SELECT * FROM users WHERE name = ?', [username], function(err, results) {
        if (err) {
          throw err;
        }
        if (results.length === 0) {
          db.query('INSERT INTO users SET ?', {name: username}, function(err, result) {
            if (err) {
              throw err;
            }
            callback();
          });
        } else {
          callback();
        }
      });
    }
  }
};

