CREATE OR ALTER PROCEDURE registerUser(
    @userId VARCHAR(100),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(100),
    @role VARCHAR(50),
    @phoneNumber VARCHAR(20),
    @hashedPwd VARCHAR(300)    
)
AS
BEGIN
IF NOT EXISTS(SELECT * FROM users WHERE email = @email)
    BEGIN
        INSERT INTO users( userId,firstName,lastName, email, role,phoneNumber,password, isWelcomed, isDeleted, registerDate)
        VALUES(@userId, @firstName, @lastName, @email,@role, @phoneNumber, @hashedPwd, 0, 0, GETDATE())
    END
ELSE
    BEGIN 
        DECLARE @error VARCHAR(100) = 'Email is already registered'
        RAISERROR(@error, 16, 1);
        RETURN
    END
END


UPDATE users SET role = 'admin' WHERE email = 'muriithikiamad1@gmail.com'