CREATE OR ALTER PROCEDURE getOneCourier(@userId VARCHAR(100))
AS
BEGIN
    IF EXISTS(SELECT * FROM users WHERE role = 'courier')
        BEGIN
            SELECT * FROM users WHERE userId = @userId
        END
    ELSE
        BEGIN
            DECLARE @error VARCHAR(100) = 'There are no couriers available'
            RAISERROR(@error, 16, 1);
            RETURN
        END
END