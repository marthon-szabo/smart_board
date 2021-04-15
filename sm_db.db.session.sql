-- CREATE TABLE Boards (
--     board_id CHAR PRIMARY KEY,
--     board_name CHAR,
--     users_boards_id CHAR NOT NULL,
--     FOREIGN KEY(users_boards_id) REFERENCES Users_Boards(users_boards_id)
-- );

-- CREATE TABLE Users_Boards (
--     users_boards_id CHAR PRIMARY KEY,
--     board_id CHAR NOT NULL,
--     user_id CHAR NOT NULL,
--     FOREIGN KEY(board_id) REFERENCES Boards(board_id),
--     FOREIGN KEY(user_id) REFERENCES Users(user_id)
-- );

Create table Columns (
    column_id int PRIMARY KEY UNIQUE,
    board_id int not null,
    column_name char(50) NOT NULL,
    FOREIGN KEY(board_id)
    REFERENCES Boards(board_id)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);