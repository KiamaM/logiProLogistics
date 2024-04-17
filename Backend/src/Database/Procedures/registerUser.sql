CREATE OR ALTER PROCEDURE registerUser(
    @userId VARCHAR(100),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(100),
    @phoneNumber VARCHAR(20),
    @password VARCHAR(50),
    @isWelcomed BIT,
    @isDeleted BIT,
    @registerDate DATE
    
)
AS
BEGIN
IF NOT EXISTS(SELECT * FROM users WHERE email = @email)
    BEGIN
        INSERT INTO users( userId,firstName,lastName, email,phoneNumber,password, isWelcomed, isDeleted, registerDate)
        VALUES(@userId, @firstName, @lastName, @email, @phoneNumber, @password, 0, 0, GETDATE())
    END
ELSE
    BEGIN 
        DECLARE @error VARCHAR(100) = 'Email is already registered'
        RAISERROR(@error, 16, 1);
        RETURN
    END
END