CREATE OR ALTER PROCEDURE login(@email VARCHAR(100))
AS
    BEGIN
        SELECT * FROM users WHERE email = @email
    END