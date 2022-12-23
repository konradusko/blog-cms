CREATE TABLE IF NOT EXISTS Smtp (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host TEXT NOT NULL,
                    user TEXT NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT NOT NULL UNIQUE
                    )