CREATE DATABASE itop1000;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    isAdmin BIT
);

CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    user_id SERIAL,
    name VARCHAR(255),
    gender VARCHAR(255),
    birthdate VARCHAR(255),
    city VARCHAR(255)
);