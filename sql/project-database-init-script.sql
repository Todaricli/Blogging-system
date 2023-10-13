/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 * 
 * It is recommened for your server automatically create & init the database
 * 
 * However this script will serve as documentation / backup for how your database is designed
 */


DROP TABLE IF EXISTS notify;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS subscription;
DROP TABLE IF EXISTS likes_comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id          INTEGER     NOT NULL PRIMARY KEY,
    username    VARCHAR(28) NOT NULL,
    password    VARCHAR(28) NOT NULL,
    auth_token  VARCHAR(100),
    email       VARCHAR(28),
    fname       VARCHAR(28),
    lname       VARCHAR(28),
    DOB         DATE,
    description VARCHAR(120),
    icon_path   VARCHAR(20),
    admin       INTEGER     NOT NULL,
    CHECK (admin >= 0 AND admin <= 1)
);

INSERT INTO user
    (id, username, password, fname, lname, DOB, description, icon_path, admin)
VALUES
    (1, 'user1', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'John', 'Doe', '1990-01-01', 'User 1', '/images/avatars/guy1.png', 0),
    (2, 'user2', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Jane', 'Smith', '1995-03-15', 'User 2', '/images/avatars/girl2.png', 0),
    (3, 'user3', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Bob', 'Johnson', '1988-07-20', 'User 3', '/images/avatars/guy2.png', 0),
    (4, 'user4', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Alice', 'Williams', '1992-09-10', 'User 4', '/images/avatars/girl1.png', 0),
    (5, 'user5', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Charlie', 'Brown', '1998-12-05', 'User 5', '/images/avatars/guy3.png', 0),
    (6, 'user6', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Eve', 'Anderson', '1993-04-30', 'User 6', '/images/avatars/girl3.png', 0),
    (7, 'user7', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'David', 'Wilson', '1996-06-25', 'User 7', '/images/avatars/guy4.png', 0),
    (8, 'user8', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Grace', 'Miller', '1991-11-15', 'User 8', '/images/avatars/girl4.png', 0),
    (9, 'user9', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Frank', 'Martinez', '1987-02-08', 'User 9', '/images/avatars/guy5.png', 0),
    (10, 'user10', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Olivia', 'Jones', '1994-08-12', 'User 10', '/images/avatars/girl6.png', 0);

CREATE TABLE articles
(
    id              INTEGER       NOT NULL PRIMARY KEY,
    title           VARCHAR(88)   NOT NULL,
    content         VARCHAR(8000) NOT NULL,
    genre           VARCHAR(20),
    date_of_publish TIMESTAMP     NOT NULL,
    author_id       INTEGER       NOT NULL,
    FOREIGN KEY (author_id) REFERENCES user (id)
);

-- Inserting 15 rows of sample data into the articles table
INSERT INTO articles (id, title, content, date_of_publish, author_id)
VALUES (1, 'Introduction to Fabric Types',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 10:00:00', 1),
       (2, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 4),
       (3, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 5),
       (4, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 8),
       (5, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 3),
       (6, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 4),
       (7, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 5),
       (8, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 2),
       (9, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 10),
       (10, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 2),
       (11, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 2),
       (12, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 4),
       (13, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 2),
       (14, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 10),
       (15, 'Silk Fabric Production',
        '{"ops":[{"insert":"Lorem Ipsum"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"attributes":{"italic":true},"insert":"\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\""},{"attributes":{"align":"center","header":4},"insert":"\n"},{"insert":"\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\""},{"attributes":{"align":"center","header":5},"insert":"\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Sed pellentesque nibh eget cursus sollicitudin."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent vestibulum massa in felis pellentesque feugiat."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut finibus nulla dignissim diam luctus elementum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Morbi eget lorem tempor, finibus lectus vitae, suscipit felis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Duis fringilla nisl et tincidunt euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent nec lectus lacinia, lobortis urna interdum, pharetra risus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Maecenas sollicitudin augue eu nunc maximus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nulla aliquam nunc ac felis placerat, quis consequat quam imperdiet."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Nullam suscipit velit eget orci molestie, eu convallis felis tincidunt."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Mauris accumsan ligula et massa posuere, a interdum arcu rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Cras rutrum orci a vestibulum auctor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Praesent non tortor ac nunc tempus pulvinar id non est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Pellentesque efficitur lacus in velit tristique, nec convallis neque interdum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"insert":"Ut aliquam justo quis porta euismod."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 111 words, 855 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"\n"}]}',
        '2023-10-10 11:30:00', 8);


CREATE TABLE comments
(
    id              INTEGER   NOT NULL,
    user_id         INTEGER   NOT NULL,
    article_id      INTEGER   NOT NULL,
    content         VARCHAR(1000),
    time_of_comment TIMESTAMP NOT NULL,
    comments_id     INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (article_id) REFERENCES articles (id)
);

-- Inserting 20 rows of sample data into the comments table with NULL comments_id
INSERT INTO comments (id, user_id, article_id, content, time_of_comment, comments_id)
VALUES (1, 1, 1, 'Great article!', '2023-10-10 10:15:00', NULL),
       (2, 2, 1, 'I learned a lot from this.', '2023-10-10 11:30:00', NULL),
       (3, 3, 2, 'Silk fabric is so elegant!', '2023-10-10 12:45:00', NULL),
       (4, 4, 2, 'I love wearing silk!', '2023-10-10 14:00:00', NULL),
       (5, 5, 3, 'Cotton is my favorite fabric.', '2023-10-10 15:15:00', NULL),
       (6, 1, 3, 'Polyester is versatile.', '2023-10-10 16:30:00', NULL),
       (7, 2, 4, 'Wool keeps you warm in winter.', '2023-10-10 17:45:00', NULL),
       (8, 3, 4, 'I have a wool sweater.', '2023-10-10 19:00:00', NULL),
       (9, 4, 5, 'Linen is great for summer.', '2023-10-10 20:15:00', NULL),
       (10, 5, 5, 'I need linen sheets.', '2023-10-10 21:30:00', NULL),
       (11, 1, 6, 'Satin is so luxurious!', '2023-10-10 22:45:00', NULL),
       (12, 2, 6, 'I have a satin dress.', '2023-10-10 23:59:00', NULL),
       (13, 3, 7, 'Denim jeans are classic.', '2023-10-11 10:15:00', NULL),
       (14, 4, 7, 'I like distressed denim.', '2023-10-11 11:30:00', NULL),
       (15, 5, 8, 'Velvet feels so soft.', '2023-10-11 12:45:00', NULL),
       (16, 1, 8, 'I have a velvet sofa.', '2023-10-11 14:00:00', NULL),
       (17, 2, 9, 'Polyester is easy to care for.', '2023-10-11 15:15:00', NULL),
       (18, 3, 9, 'I prefer natural fabrics.', '2023-10-11 16:30:00', NULL),
       (19, 4, 10, 'Sustainability is important.', '2023-10-11 17:45:00', NULL),
       (20, 5, 10, 'I support eco-friendly fabrics.', '2023-10-11 19:00:00', NULL);

CREATE TABLE likes
(
    id         INTEGER NOT NULL,
    user_id    INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    PRIMARY KEY (id, user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (article_id) REFERENCES articles (id)
);

-- Inserting 20 rows of sample data into the likes table
INSERT INTO likes (id, user_id, article_id)
VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 2),
    (4, 4, 2),
    (5, 5, 3),
    (6, 1, 3),
    (7, 2, 4),
    (8, 3, 4),
    (9, 4, 5),
    (10, 5, 5),
    (11, 1, 6),
    (12, 2, 6),
    (13, 3, 7),
    (14, 4, 7),
    (15, 5, 8),
    (16, 1, 8),
    (17, 2, 9),
    (18, 3, 9),
    (19, 4, 10),
    (20, 5, 10);

CREATE TABLE likes_comments
(
    user_id     INTEGER NOT NULL,
    comments_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, comments_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (comments_id) REFERENCES comments (id)
);

-- Insert 20 rows of data into the likes_comments table
INSERT INTO likes_comments (user_id, comments_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (2, 5),
       (2, 6),
       (3, 7),
       (3, 8),
       (3, 9),
       (4, 10),
       (4, 11),
       (4, 12),
       (5, 13),
       (5, 14),
       (5, 15),
       (6, 16),
       (6, 17),
       (6, 18),
       (7, 19),
       (7, 20);

CREATE TABLE subscription
(
    being_subscribed_id INTEGER NOT NULL,
    follower_id         INTEGER NOT NULL,
    PRIMARY KEY (being_subscribed_id, follower_id),
    FOREIGN KEY (being_subscribed_id) REFERENCES user (id),
    FOREIGN KEY (follower_id) REFERENCES user (id)
);

-- Inserting 20 rows of sample data into the subscription table
INSERT INTO subscription (being_subscribed_id, follower_id)
VALUES (1, 2),
       (1, 3),
       (1, 4),
       (2, 3),
       (2, 4),
       (2, 5),
       (3, 4),
       (3, 5),
       (3, 1),
       (4, 5),
       (4, 1),
       (4, 2),
       (5, 1),
       (5, 2),
       (5, 3),
       (1, 5),
       (2, 1),
       (3, 2),
       (4, 3),
       (5, 4);

CREATE TABLE notifications
(
    id      INTEGER   NOT NULL PRIMARY KEY,
    host_id INTEGER   NOT NULL,
    time    TIMESTAMP NOT NULL,
    content VARCHAR(88),
    FOREIGN KEY (host_id) REFERENCES user (id)
);

-- Inserting 20 rows of sample data into the notifications table
INSERT INTO notifications (id, host_id, time, content)
VALUES (1, 1, '2023-10-10 10:15:00', 'You have a new follower.'),
       (2, 2, '2023-10-10 11:30:00', 'New article published: "Introduction to Fabric Types"'),
       (3, 3, '2023-10-10 12:45:00', 'Someone liked your comment.'),
       (4, 4, '2023-10-10 14:00:00', 'New article published: "Silk Fabric Production"'),
       (5, 5, '2023-10-10 15:15:00', 'You have a new follower.'),
       (6, 1, '2023-10-10 16:30:00', 'Your article received a comment.'),
       (7, 2, '2023-10-10 17:45:00', 'New article published: "Cotton vs. Polyester"'),
       (8, 3, '2023-10-10 19:00:00', 'Someone liked your article.'),
       (9, 4, '2023-10-10 20:15:00', 'You have a new follower.'),
       (10, 5, '2023-10-10 21:30:00', 'New article published: "Wool Fabric Properties"'),
       (11, 1, '2023-10-10 22:45:00', 'Someone liked your comment.'),
       (12, 2, '2023-10-10 23:59:00', 'You have a new follower.'),
       (13, 3, '2023-10-11 10:15:00', 'New article published: "Linen Fabric Uses"'),
       (14, 4, '2023-10-11 11:30:00', 'Your article received a comment.'),
       (15, 5, '2023-10-11 12:45:00', 'Someone liked your article.'),
       (16, 1, '2023-10-11 14:00:00', 'You have a new follower.'),
       (17, 2, '2023-10-11 15:15:00', 'New article published: "Satin Fabric Elegance"'),
       (18, 3, '2023-10-11 16:30:00', 'Your comment was mentioned in an article.'),
       (19, 4, '2023-10-11 17:45:00', 'New article published: "Denim Fabric History"'),
       (20, 5, '2023-10-11 19:00:00', 'Your article was shared by a follower.');

CREATE TABLE notify
(
    id              INTEGER NOT NULL,
    notification_id INTEGER NOT NULL,
    follower_id     INTEGER NOT NULL,
    PRIMARY KEY (id, notification_id, follower_id),
    FOREIGN KEY (notification_id) REFERENCES notifications (id),
    FOREIGN KEY (follower_id) REFERENCES user (id)
);

-- Inserting 20 rows of sample data into the notify table
INSERT INTO notify (id, notification_id, follower_id)
VALUES (1, 1, 2),
       (2, 2, 3),
       (3, 3, 4),
       (4, 4, 5),
       (5, 5, 1),
       (6, 6, 2),
       (7, 7, 3),
       (8, 8, 4),
       (9, 9, 5),
       (10, 10, 1),
       (11, 11, 2),
       (12, 12, 3),
       (13, 13, 4),
       (14, 14, 5),
       (15, 15, 1),
       (16, 16, 2),
       (17, 17, 3),
       (18, 18, 4),
       (19, 19, 5),
       (20, 20, 1);

-- creating a view that shows articles likes, comments and popularity
DROP VIEW IF EXISTS articles_info;

create view [Articles_info]as 
select articles.author_id as user_id,articles.id as article_id,user.fname, user.lname, articles.title, count(likes.id) as like_count, comments_count, (count(likes.id) + comments_count*2) as popularity
	from articles
	left join likes on articles.id = likes.article_id
	left join (
		select article_id as comment_articles_id, count(comments.id) as comments_count
			from comments 
			group by article_id
	) on articles.id = comment_articles_id
	left join user on user.id = articles.author_id
 group by articles.id;













