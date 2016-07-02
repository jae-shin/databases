var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var db = mysql.createConnection({
  user: 'root',
  password: 'jae',
  database: 'chat'
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('database connected as id ' + db.threadId);
});

module.exports = db;

