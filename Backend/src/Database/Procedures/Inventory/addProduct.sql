CREATE OR ALTER PROCEDURE addProduct(
    @productId VARCHAR(100),
    @image VARCHAR(100),
    @productName VARCHAR(50),
    @description VARCHAR(300),
    @category VARCHAR(50),
    @quantity NUMERIC,
    @currentPrice NUMERIC,
    @formerPrice NUMERIC
)
AS 
    BEGIN
        IF NOT EXISTS(SELECT * FROM inventory WHERE productName = @productName)
            BEGIN
                INSERT INTO inventory(productId, image, productName, description, category, quantity, currentPrice, formerPrice, isDeleted)
                VALUES(@productId, @image, @productName, @description, @category, @quantity, @currentPrice, @formerPrice, 0)
            END
        ELSE
            BEGIN
                DECLARE @error VARCHAR(100) = 'Product already added, kindly adjust quantity'
                RAISERROR(@error, 16, 1);
            END
    END