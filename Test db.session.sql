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