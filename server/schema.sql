CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  user varchar(255),
  message varchar(255),
  room varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES users(id),
  FOREIGN KEY (room) REFERENCES rooms(id)

);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE users_rooms (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  room_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

