var db = require('../db');

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
      db.query('SELECT id FROM users WHERE name = ?', [username], function(err, results) {
        if (err) { 
          throw err; 
        } else {
          if (results.length === 0) {
            db.query('INSERT INTO users SET ?', {name: username}, function(err, insertResults) {
              if (err) {
                throw err;
              }
              var queryArgs = {
                userId: insertResults.insertId,
                roomname: message.roomname,
                text: message.message
              };
              db.query('INSERT INTO messages SET ?', queryArgs, function(err, results) {
                if (err) {
                  throw err;
                }
                callback();
              });
            });
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
        }
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

