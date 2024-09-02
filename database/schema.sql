CREATE DATABASE user_database;

USE user_database;

CREATE TABLE IF NOT EXISTS User (
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  matchesplayed INT NOT NULL,
  windate DATE NOT NULL,
  wincount INT NOT NULL,
  PRIMARY KEY (username, windate)
);


INSERT INTO User (username, password, matchesplayed, windate, wincount) VALUES
('playerOne', '1', 50, '2024-07-20', 3),
('playerOne', '1', 50, '2024-07-22', 3),
('playerOne', '1', 50, '2024-07-16', 5),
('playerTwo', '2', 30, '2024-07-22', 2),
('playerTwo', '2', 30, '2024-07-21', 4);

