CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName varchar(255),
  lastName varchar(255),
  email varchar(255),
  password text,
  birthday DATE,
  isMale boolean,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name varchar(64) NOT NULL,
  last_name varchar(64) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  password text NOT NULL,
  birthday DATE CHECK (birthday<=current_date),
  is_male boolean,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);