CREATE OR ALTER PROCEDURE itemsInCart(@userId VARCHAR(100))
AS
BEGIN
        SELECT * FROM cart c 
        INNER JOIN users u ON c.userId = u.userId
        INNER JOIN inventory i ON c.productId = i.productId
        WHERE c.userId = @userId AND c.isRemoved = 0
END 