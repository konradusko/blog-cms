CREATE TABLE IF NOT EXISTS Logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    logType TEXT NOT NULL,
                    userLogin TEXT NOT NULL,
                    message TEXT NOT NULL,
                    createAt TEXT NOT NULL,
                    readed BOOLEAN NOT NULL,
                    userID INTEGER NOT NULL,
                    FOREIGN KEY (userID) REFERENCES Users(id)
                    )