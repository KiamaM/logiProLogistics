CREATE OR ALTER PROCEDURE deleteProduct(@productId VARCHAR(100))
AS 
BEGIN
    UPDATE inventory SET isDeleted = 1 WHERE productId = @productId
END