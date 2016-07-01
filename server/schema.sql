CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);

-- CREATE TABLE rooms (
--   id int NOT NULL AUTO_INCREMENT,
--   name varchar(255),
--   PRIMARY KEY (id)
-- );

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  roomname varchar(255),
  text varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

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

