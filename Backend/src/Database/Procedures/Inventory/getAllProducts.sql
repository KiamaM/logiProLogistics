CREATE OR ALTER PROCEDURE getAllProducts
AS
BEGIN
    IF EXISTS(SELECT * FROM inventory)
        BEGIN
            SELECT * FROM inventory
        END
    ELSE
        BEGIN
            DECLARE @error VARCHAR(100) = 'There are no products to display'
            RAISERROR(@error, 16, 1);
            RETURN
        END
END