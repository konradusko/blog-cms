CREATE TABLE IF NOT EXISTS SystemConfig (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    domain TEXT NOT NULL, 
                    blockIp BOOLEAN NOT NULL,
                    requiredHttps BOOLEAN NOT NULL,
                    type TEXT NOT NULL UNIQUE
                    )