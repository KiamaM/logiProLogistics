CREATE TABLE users(
    userId VARCHAR(100) PRIMARY KEY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    phoneNumber VARCHAR(20) NOT NULL,
    password VARCHAR(300) NOT NULL,
    isWelcomed BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0,
    registerDate DATE
)

DROP TABLE users

ALTER TABLE users
ADD CONSTRAINT DF_users_role DEFAULT 'customer' FOR role;
