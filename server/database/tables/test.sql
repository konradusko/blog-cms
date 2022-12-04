CREATE TABLE IF NOT EXISTS Wholesaler (
                    _id INTEGER PRIMARY KEY AUTOINCREMENT,
                    panelLinkWholesaler TEXT NOT NULL UNIQUE,
                    cryptoPasswordWholesaler TEXT NOT NULL,
                    loginWholesaler TEXT NOT NULL,
                    activeWholesaler TEXT NOT NULL,
                    nameWholesaler TEXT NOT NULL UNIQUE
                    )