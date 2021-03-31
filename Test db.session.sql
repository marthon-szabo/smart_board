DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    username char(50),
    badges char,
    done_quests char,
    taken_quests char,
    password char(250),
    email char(250)
);

DROP TABLE IF EXISTS Boards;
CREATE TABLE Boards (
    board_id CHAR PRIMARY KEY,
    board_name CHAR
);

DROP TABLE IF EXISTS Users_Boards;
CREATE TABLE Users_Boards (
    users_boards_id char PRIMARY KEY,
    board_id CHAR NOT NULL,
    user_id CHAR NOT NULL,
    FOREIGN KEY(board_id) REFERENCES Boards(board_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);
-- INSERT INTO Boards VALUES('TestBoard', 'First Board');

SELECT * FROM Boards;