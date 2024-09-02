
CREATE DATABASE IF NOT EXISTS user_database;


USE user_database;


CREATE TABLE IF NOT EXISTS `User` (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    matchesplayed INT NOT NULL,
    windate DATE NOT NULL,
    wincount INT NOT NULL,
    PRIMARY KEY (username, windate)
);


CREATE USER IF NOT EXISTS 'user1' IDENTIFIED BY 'rootpass123';
GRANT ALL PRIVILEGES ON *.* TO 'user1' WITH GRANT OPTION;
FLUSH PRIVILEGES;

