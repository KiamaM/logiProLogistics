CREATE OR ALTER PROCEDURE getAllCustomers
AS
BEGIN
    IF EXISTS(SELECT * FROM users WHERE role = 'customer')
        BEGIN
            SELECT * FROM users WHERE role = 'customer'
        END
    ELSE
        BEGIN
            DECLARE @error VARCHAR(100) = 'There are no customers available'
            RAISERROR(@error, 16, 1);
            RETURN
        END
END