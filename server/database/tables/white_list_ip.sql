CREATE TABLE IF NOT EXISTS WhiteList (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ip TEXT NOT NULL UNIQUE,
                    createAt TEXT NOT NULL
                    )