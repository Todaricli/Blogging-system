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

create table test (
    id integer not null primary key,
    stuff text  
);

insert into test (stuff) values
    ('Things'),
    ('More things');


-- Create dummy data to test the login
drop table if exists userTest;

create table userTest (
    id integer not null primary key,
    username text,
    password text,
    name text
);

insert into userTest (username, password, name) values
    ('user1', '123', 'Alice'),
    ('user2', '123', 'Bob');