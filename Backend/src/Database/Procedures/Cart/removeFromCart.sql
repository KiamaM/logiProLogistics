CREATE OR ALTER PROCEDURE removeFromCart(@productId VARCHAR(100))
AS 
BEGIN
    UPDATE cart SET isRemoved = 1 WHERE productId = @productId
END