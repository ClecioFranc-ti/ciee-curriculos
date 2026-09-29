IF DB_ID(N'CIEECurriculos') IS NULL
BEGIN
    CREATE DATABASE CIEECurriculos;
END;
GO
USE CIEECurriculos;
GO
IF OBJECT_ID(N'dbo.candidatos', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.candidatos (
        id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_candidatos PRIMARY KEY,
        nome NVARCHAR(150) NOT NULL,
        email NVARCHAR(254) NOT NULL,
        telefone NVARCHAR(30) NULL,
        cpf NVARCHAR(20) NULL,
        formacao NVARCHAR(255) NULL,
        experiencia NVARCHAR(MAX) NULL,
        created_at DATETIME2 NOT NULL CONSTRAINT DF_candidatos_created_at DEFAULT SYSUTCDATETIME(),
        updated_at DATETIME2 NOT NULL CONSTRAINT DF_candidatos_updated_at DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX IX_candidatos_email ON dbo.candidatos(email);
END;
GO
