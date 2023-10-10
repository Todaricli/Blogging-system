/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 * 
 * It is recommened for your server automatically create & init the database
 * 
 * However this script will serve as documentation / backup for how your database is designed
 */

drop table if exists test;

create table test
(
    id integer not null primary key,
    stuff text
);

insert into test
    (stuff)
values
    ('Things'),
    ('More things');

DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id INTEGER NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    fname VARCHAR(50),
    lname VARCHAR(50),
    DOB DATE,
    description VARCHAR(120),
    icon_path VARCHAR(20),
    admin INTEGER NOT NULL,
    CHECK (admin >= 0 AND admin <= 1)
);

INSERT INTO user
    (id, username, password, fname, lname, DOB, description, icon_path, admin)
VALUES
    (1, 'user1', '123', 'John', 'Doe', '1990-01-01', 'User 1', 'path1', 0),
    (2, 'user2', '123', 'Jane', 'Smith', '1995-03-15', 'User 2', 'path2', 0),
    (3, 'user3', '123', 'Bob', 'Johnson', '1988-07-20', 'User 3', 'path3', 0),
    (4, 'user4', '123', 'Alice', 'Williams', '1992-09-10', 'User 4', 'path4', 0),
    (5, 'user5', '123', 'Charlie', 'Brown', '1998-12-05', 'User 5', 'path5', 0),
    (6, 'user6', '123', 'Eve', 'Anderson', '1993-04-30', 'User 6', 'path6', 0),
    (7, 'user7', '123', 'David', 'Wilson', '1996-06-25', 'User 7', 'path7', 0),
    (8, 'user8', '123', 'Grace', 'Miller', '1991-11-15', 'User 8', 'path8', 0),
    (9, 'user9', '123', 'Frank', 'Martinez', '1987-02-08', 'User 9', 'path9', 0),
    (10, 'user10', '123', 'Olivia', 'Jones', '1994-08-12', 'User 10', 'path10', 0);

ALTER TABLE user
ADD COLUMN authtoken VARCHAR
(50) DEFAULT NULL;

