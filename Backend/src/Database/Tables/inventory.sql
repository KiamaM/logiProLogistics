CREATE TABLE inventory(
    productId VARCHAR(100) PRIMARY KEY NOT NULL,
    image VARCHAR(100) NOT NULL,
    productName VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity NUMERIC NOT NULL,
    currentPrice NUMERIC NOT NULL,
    formerPrice NUMERIC NOT NULL,
    isDeleted BIT DEFAULT 0
)

SELECT * FROM inventory