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
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS "user";

CREATE TABLE "user"
(
    id INTEGER NOT NULL PRIMARY KEY,
    username VARCHAR(28) NOT NULL,
    password VARCHAR(28) NOT NULL,
    auth_token VARCHAR(100),
	email VARCHAR(28),
    fname VARCHAR(28),
    lname VARCHAR(28),
    DOB DATE,
    description VARCHAR(120),
    icon_path VARCHAR(20),
    admin INTEGER NOT NULL,
    CHECK (admin >= 0 AND admin <= 1)
);

INSERT INTO "user"
    (id, username, password, fname, lname, DOB, description, icon_path, admin)
VALUES
    (1, 'user1', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'John', 'Doe', '1990-01-01', 'User 1', 'path1', 0),
    (2, 'user2', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Jane', 'Smith', '1995-03-15', 'User 2', 'path2', 0),
    (3, 'user3', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Bob', 'Johnson', '1988-07-20', 'User 3', 'path3', 0),
    (4, 'user4', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Alice', 'Williams', '1992-09-10', 'User 4', 'path4', 0),
    (5, 'user5', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Charlie', 'Brown', '1998-12-05', 'User 5', 'path5', 0),
    (6, 'user6', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Eve', 'Anderson', '1993-04-30', 'User 6', 'path6', 0),
    (7, 'user7', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'David', 'Wilson', '1996-06-25', 'User 7', 'path7', 0),
    (8, 'user8', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Grace', 'Miller', '1991-11-15', 'User 8', 'path8', 0),
    (9, 'user9', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Frank', 'Martinez', '1987-02-08', 'User 9', 'path9', 0),
    (10, 'user10', '$2b$10$E3bLcihN46HGIzd9ue1SH.XWbw41Ba0Eohx2vokivFFwuBkzqVGv2', 'Olivia', 'Jones', '1994-08-12', 'User 10', 'path10', 0);

CREATE TABLE articles (
    id INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR(88) NOT NULL,
    content VARCHAR(8000) NOT NULL,
    date_of_publish TIMESTAMP NOT NULL,
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES "user" (id)
);

-- Inserting 15 rows of sample data into the articles table
INSERT INTO articles (id, title, content, date_of_publish, author_id)
VALUES
    (1, 'Introduction to Fabric Types', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 10:00:00', 1),
    (2, 'Silk Fabric Production', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 11:30:00', 2),
    (3, 'Cotton vs. Polyester', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 13:15:00', 3),
    (4, 'Wool Fabric Properties', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 14:45:00', 4),
    (5, 'Linen Fabric Uses', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 16:20:00', 5),
    (6, 'Satin Fabric Elegance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 09:45:00', 6),
    (7, 'Denim Fabric History', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 12:30:00', 7),
    (8, 'Velvet Fabric Luxury', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 14:00:00', 8),
    (9, 'Polyester Fabric Advantages', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 15:45:00', 9),
    (10, 'Sustainable Fabrics', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 17:30:00', 10),
    (11, 'Nylon Fabric Applications', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 18:15:00', 1),
    (12, 'Spandex Fabric Stretch', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 10:45:00', 2),
    (13, 'Flannel Fabric Comfort', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 12:20:00', 3),
    (14, 'Bamboo Fabric Sustainability', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 13:50:00', 4),
    (15, 'Leather Fabric Durability', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis erat magna, quis laoreet nisi pretium quis. Cras orci nunc, luctus gravida maximus cursus, viverra at nunc. Vestibulum vel ultricies ex, sed sodales magna. Suspendisse potenti. Mauris mattis ac nibh a dignissim. Pellentesque volutpat eleifend ante, sed viverra dui rhoncus in. Maecenas pellentesque ullamcorper ex ac sagittis. Praesent est nulla, sodales id lectus non, gravida hendrerit neque. Nullam lobortis magna sem, a efficitur dui ornare vel. Pellentesque iaculis dolor quis lectus euismod, vitae varius felis aliquet. Mauris dictum varius turpis. Nullam dignissim, nisl non sagittis vestibulum, nisl libero tincidunt dui, viverra tempor ipsum sapien sed velit. Morbi ut sem vitae massa iaculis euismod. Nullam iaculis nibh dolor, in ultricies diam dignissim pretium.

Cras at mi vel massa aliquam consequat. Maecenas sed est id massa fringilla sodales sit amet porttitor lorem. Fusce viverra condimentum augue, eu hendrerit dolor pretium id. Donec nec justo sit amet nisi porttitor pulvinar vitae vel quam. Vivamus non luctus erat. Nullam at nisl vitae sem vestibulum tempus. Phasellus malesuada leo posuere, efficitur augue id, varius ante. Aenean vestibulum porta nisi, et tempus nunc gravida sit amet. Etiam dignissim facilisis condimentum. Pellentesque ex libero, convallis porttitor consequat vel, auctor sed mi. Aenean vulputate nisl id nunc lacinia, a vulputate mi tincidunt. Donec a felis eu velit ornare lobortis eget id dui. Sed ut sem bibendum metus lacinia tincidunt sed ac lorem. Praesent fermentum, libero ac finibus faucibus, diam elit auctor risus, non ornare nulla dui quis tellus.

Maecenas hendrerit varius nisi, vitae maximus nunc porttitor et. Phasellus aliquam nisl ac erat laoreet, at iaculis mauris ullamcorper. Donec porttitor magna sapien, varius dapibus elit venenatis id. Sed semper erat eu elit posuere, id malesuada erat vestibulum. Maecenas volutpat ac neque in volutpat. Nulla at mauris mattis, imperdiet ante nec, pellentesque nulla. In aliquam dignissim diam vel vulputate. Donec nulla augue, laoreet nec rhoncus at, tristique vel ligula.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at risus quis nulla lobortis condimentum. Donec quis sollicitudin ex. Curabitur augue ante, rutrum et tincidunt ac, congue id nisi. Suspendisse mollis urna ut nunc elementum, nec condimentum massa sagittis. Nullam porttitor sagittis massa et feugiat. Curabitur a tempus mauris, sit amet tempor purus. Curabitur tempor congue ante non gravida. Maecenas interdum scelerisque purus nec aliquam. Phasellus eu purus eget metus convallis mollis eu sed neque.

Nullam ac libero mauris. Integer rutrum lectus erat, eget fringilla ante lacinia eu. Proin malesuada dolor nunc, id lacinia metus pulvinar ut. Nunc sodales elit id eros maximus tincidunt. Phasellus non erat ac nunc eleifend pretium. Donec eget consectetur dui. Nulla risus lacus, fermentum a finibus ut, rhoncus vestibulum lectus. Nunc vulputate mattis molestie. Pellentesque ornare vel turpis et accumsan. Phasellus eget ipsum elit. Nullam placerat velit vitae felis lacinia pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec enim malesuada, dignissim diam a, consectetur lacus. Proin tincidunt neque molestie lorem volutpat, vel suscipit.', '2023-10-10 16:10:00', 5);

CREATE TABLE comments (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    content VARCHAR(1000),
    time_of_comment TIMESTAMP NOT NULL,
    comments_id INTEGER,
    PRIMARY KEY (id, user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (article_id) REFERENCES articles (id)
);

-- Inserting 20 rows of sample data into the comments table with NULL comments_id
INSERT INTO comments (id, user_id, article_id, content, time_of_comment, comments_id)
VALUES
    (1, 1, 1, 'Great article!', '2023-10-10 10:15:00', NULL),
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

CREATE TABLE likes (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    comments_id INTEGER,
    PRIMARY KEY (id, user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (article_id) REFERENCES articles (id)
);

-- Inserting 20 rows of sample data into the likes table
INSERT INTO likes (id, user_id, article_id, comments_id)
VALUES
    (1, 1, 1, NULL),
    (2, 2, 1, NULL),
    (3, 3, 2, NULL),
    (4, 4, 2, NULL),
    (5, 5, 3, NULL),
    (6, 1, 3, NULL),
    (7, 2, 4, NULL),
    (8, 3, 4, NULL),
    (9, 4, 5, NULL),
    (10, 5, 5, NULL),
    (11, 1, 6, NULL),
    (12, 2, 6, NULL),
    (13, 3, 7, NULL),
    (14, 4, 7, NULL),
    (15, 5, 8, NULL),
    (16, 1, 8, NULL),
    (17, 2, 9, NULL),
    (18, 3, 9, NULL),
    (19, 4, 10, NULL),
    (20, 5, 10, NULL);

CREATE TABLE subscription(
    being_subscribed_id INTEGER NOT NULL,
    follower_id INTEGER NOT NULL,
    PRIMARY KEY (being_subscribed_id, follower_id),
    FOREIGN KEY (being_subscribed_id) REFERENCES "user" (id),
    FOREIGN KEY (follower_id) REFERENCES "user" (id)
);

-- Inserting 20 rows of sample data into the subscription table
INSERT INTO subscription (being_subscribed_id, follower_id)
VALUES
    (1, 2),
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

CREATE TABLE notifications(
    id INTEGER NOT NULL PRIMARY KEY,
    host_id INTEGER NOT NULL,
    time TIMESTAMP NOT NULL,
    content VARCHAR(88),
    FOREIGN KEY (host_id) REFERENCES "user" (id)
);

-- Inserting 20 rows of sample data into the notifications table
INSERT INTO notifications (id, host_id, time, content)
VALUES
    (1, 1, '2023-10-10 10:15:00', 'You have a new follower.'),
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

CREATE TABLE notify (
    id INTEGER NOT NULL,
    notification_id INTEGER NOT NULL,
    follower_id INTEGER NOT NULL,
    PRIMARY KEY (id, notification_id, follower_id),
    FOREIGN KEY (notification_id) REFERENCES notifications (id),
    FOREIGN KEY (follower_id) REFERENCES "user" (id)
);

-- Inserting 20 rows of sample data into the notify table
INSERT INTO notify (id, notification_id, follower_id)
VALUES
    (1, 1, 2),
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













