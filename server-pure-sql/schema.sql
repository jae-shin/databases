CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);

INSERT INTO users (id, name)
VALUES (1, 'jaebear'), (2, 'ironman'), (3, 'nancybotwin'), (4, 'michaelscofield');


CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  roomname varchar(255),
  text varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO messages (id, userId, roomname, text)
VALUES (1, 1, 'boston', 'its snowing a lot here!'),
(2, 2, 'space', 'my engine is out......'),
(3, 3, 'agrestic', 'where is my crew at?'),
(4, 4, 'behind bars', 'lets break out');


-- CREATE TABLE rooms (
--   id int NOT NULL AUTO_INCREMENT,
--   name varchar(255),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE users_rooms (
--   id int NOT NULL AUTO_INCREMENT,
--   user_id int,
--   room_id int,
--   PRIMARY KEY (id),
--   FOREIGN KEY (user_id) REFERENCES users(id),
--   FOREIGN KEY (room_id) REFERENCES rooms(id)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

