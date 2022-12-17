CREATE TABLE IF NOT EXISTS Ip (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ip TEXT NOT NULL UNIQUE,
                    createAt TEXT NOT NULL
                    )