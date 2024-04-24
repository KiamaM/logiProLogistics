CREATE OR ALTER PROCEDURE getOneProduct(@productId VARCHAR(100))
AS
BEGIN
    IF EXISTS(SELECT * FROM inventory)
        BEGIN
            SELECT * FROM inventory WHERE productId = @productId
        END
    ELSE
        BEGIN
            DECLARE @error VARCHAR(100) = 'Product has been deleted'
            RAISERROR(@error, 16, 1);
            RETURN
        END
END