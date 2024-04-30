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
        RETURN
    END
    ELSE
    BEGIN
        IF (SELECT quantity FROM inventory WHERE productId = @productId) < 1
        BEGIN
            DECLARE @error2 VARCHAR(50) = 'Product is currently out of stock'
            RAISERROR(@error2, 16, 1)
            RETURN
        END
        ELSE
        BEGIN
            IF NOT EXISTS(SELECT * FROM cart WHERE productId = @productId AND userId = @userId)
            BEGIN
                IF(SELECT quantity FROM inventory WHERE productId = @productId) < @quantity
                BEGIN
                    DECLARE @error4 VARCHAR(100) = 'Select a smaller quantity'
                    RAISERROR(@error4, 16, 1)
                END
                ELSE
                    BEGIN
                        INSERT INTO cart(cartId, productId, userId, quantity)
                        VALUES(@cartId, @productId, @userId, @quantity)
                        UPDATE inventory SET quantity = quantity - @quantity WHERE productId = @productId
                    END
            END
            ELSE
            BEGIN
                DECLARE @error3 VARCHAR(100) = 'Item already added to cart'
                RAISERROR(@error3, 16, 1)
                UPDATE inventory SET quantity = quantity - 1 WHERE productId = @productId
                RETURN
            END
        END
    END
END
