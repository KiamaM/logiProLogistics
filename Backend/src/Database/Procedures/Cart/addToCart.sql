CREATE OR ALTER PROCEDURE addToCart(
    @cartId VARCHAR(100),
    @productId VARCHAR(100),
    @userId VARCHAR(100),
    @quantity NUMERIC
)
AS
BEGIN
    IF NOT EXISTS(SELECT * FROM users WHERE userId = @userId)
        BEGIN
            DECLARE @error VARCHAR(50) = 'Sign up to make an order'
            RAISERROR(@error, 16, 1)
        END
    ELSE
        BEGIN
            IF(SELECT quantity FROM inventory WHERE productId = @productId) < 1
                BEGIN
                    DECLARE @error2 VARCHAR(50) = 'Product is currently out of stock'
                    RAISERROR(@error2, 16, 1)
                END
            ELSE
                BEGIN
                    INSERT INTO cart(cartId, productId, userId, quantity)
                    VALUES(@cartId, @productId, @userId, @quantity)
                END
        END
END