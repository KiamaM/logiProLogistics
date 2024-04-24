CREATE OR ALTER PROCEDURE deactivateUser(@userId VARCHAR(100))
AS 
BEGIN
    UPDATE users SET isDeleted = 1 WHERE userId = @userId
END