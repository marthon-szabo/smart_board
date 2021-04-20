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

DROP TABLE IF EXISTS Columns;
Create table Columns (
    column_id CHAR PRIMARY KEY UNIQUE,
    board_id CHAR not null,
    column_name char(50) NOT NULL,
    FOREIGN KEY(board_id)
    REFERENCES Boards(board_id)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS Tasks;
CREATE TABLE Tasks (
    task_id CHAR PRIMARY KEY,
    column_id CHAR NOT NULL,
    task_name CHAR(50) NOT NULL,
    deadline SMALLDATETIME,
    is_done INTEGER,
    task_description CHAR(100),
    subtask_id CHAR NULL,
    FOREIGN KEY(column_id) REFERENCES Columns(column_id)
    FOREIGN KEY(subtask_id) REFERENCES Tasks(task_id)
);

