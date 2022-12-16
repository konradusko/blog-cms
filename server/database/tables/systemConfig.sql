CREATE TABLE IF NOT EXISTS SystemConfig (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    domain TEXT NOT NULL, 
                    type TEXT NOT NULL UNIQUE
                    )