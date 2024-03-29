CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL, 
                    email TEXT NOT NULL UNIQUE,
                    createdAt TEXT NOT NULL,
                    role TEXT NOT NULL,
                    confirmEmail BOOLEAN NOT NULL,
                    authToken TEXT  NOT NULL,
                    emailConfirmToken TEXT  NOT NULL,
                    forgetPasswordToken TEXT  NOT NULL
                    )