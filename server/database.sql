CREATE DATABASE itop1000;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    isAdmin BIT
);