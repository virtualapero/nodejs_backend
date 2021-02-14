DROP DATABASE IF EXISTS virtual_apero;   
CREATE DATABASE IF NOT EXISTS virtual_apero;   
USE virtual_apero; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
( 
    id             INT PRIMARY KEY auto_increment, 
    username       VARCHAR(25) UNIQUE NOT NULL, 
    password       CHAR(60) NOT NULL, 
    twitter_handle VARCHAR(50) NOT NULL, 
    image          VARCHAR(50) NOT NULL, 
    role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
);

CREATE TABLE IF NOT EXISTS apero 
( 
    id             INT PRIMARY KEY auto_increment, 
    apero_date     DATE UNIQUE NOT NULL
); 