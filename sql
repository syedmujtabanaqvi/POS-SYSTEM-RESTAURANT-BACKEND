CREATE DATABASE POSDB;


USE POSDB;
GO
CREATE TABLE CUSTOMER(
CUSID INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
NAME VARCHAR(60),
PHONENUMBER BIGINT UNIQUE
);
SELECT PHONENUMBER AS PHONE FROM CUSTOMER where CUSID = (SELECT MAX(CUSID) FROM CUSTOMER)
USE POSDB;
GO
INSERT INTO CUSTOMER (NAME , PHONENUMBER) VALUES ('SYED MUJTABA ALI ', 033589302)
USE POSDB;
GO
SELECT * FROM CUSTOMER







USE POSDB;
GO

CREATE TABLE MenuItems (
    ItemCode INT PRIMARY KEY IDENTITY(1,1),
    ItemName VARCHAR(100),
    Price INT,
    IMAGEURL VARCHAR(250),
    Category VARCHAR(50),
    Description VARCHAR(150),
    IsAvailable int
);

USE POSDB;
GO
INSERT INTO MenuItems (ItemName, Price, IMAGEURL, Category, Description, IsAvailable)
VALUES ('Fries', 150, 'https://short.do/-doocv', 'Sides', 'Crispy potato fries', 7),
 ('Zinger Burger', 450, 'https://ln.run/UZ06O', 'Burger', 'Spicy chicken burger', 1),
('Zinger Burger', 450, 'https://short.do/-doocv', 'Burger', 'Spicy chicken burger', 1)

USE POSDB;
GO
INSERT INTO MenuItems (ItemName, Price, Category ) VALUES  ('tea',200,'HEHE')


SELECT * FROM MenuItems

use POSDB
go
CREATE TABLE Orders (
    Order_ID BIGINT PRIMARY KEY IDENTITY(200315,1),
    CustomerID INT,
    OrderDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CustomerID) REFERENCES CUSTOMER(CUSID)
);

use POSDB
go
INSERT INTO Orders (CustomerID) VALUES (1);

select OrderDate from Orders where Order_ID = (select MAX(Order_ID) from Orders)

select * from Orders

use POSDB
go
CREATE TABLE OrderItems (
    OrderItem_ID BIGINT PRIMARY KEY IDENTITY(1,1),
    Order_ID BIGINT,
    ItemCode INT,
    Quantity INT,
    FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID),
    FOREIGN KEY (ItemCode) REFERENCES MenuItems(ItemCode)
);



use POSDB
go
INSERT INTO OrderItems (Order_ID, ItemCode, Quantity)
VALUES 
(200317, 4, 2),(200317, 9, 1),(200317, 10, 4);

select * from OrderItems 






    SELECT 
    o.Order_ID,
    o.CustomerID,
    c.NAME AS CustomerName,
    o.OrderDate,
    oi.ItemCode,
    m.ItemName,
    oi.Quantity
FROM Orders o
INNER JOIN OrderItems oi
    ON o.Order_ID = oi.Order_ID
INNER JOIN MenuItems m
    ON oi.ItemCode = m.ItemCode
INNER JOIN CUSTOMER c
    ON o.CustomerID = c.CUSID;


use POSDB
go
    SELECT 
    o.Order_ID,
    c.NAME AS CustomerName,
    c.PHONENUMBER,
    o.OrderDate,
    m.ItemName,
    oi.Quantity,
    m.Price,
    (oi.Quantity * m.Price) AS TotalPrice
FROM Orders o
INNER JOIN CUSTOMER c
    ON o.CustomerID = c.CUSID
INNER JOIN OrderItems oi
    ON o.Order_ID = oi.Order_ID
INNER JOIN MenuItems m
    ON oi.ItemCode = m.ItemCode;

    SELECT MAX(Order_ID) FROM Orders


USE POSDB
GO

SELECT 
    SUM(oi.Quantity * m.Price) AS TotalAmount
FROM OrderItems oi
INNER JOIN MenuItems m 
    ON oi.ItemCode = m.ItemCode
WHERE oi.Order_ID = (SELECT MAX(Order_ID) FROM Orders);

    SELECT 
    SUM(oi.Quantity * m.Price) AS GrandTotal
FROM Orders o
INNER JOIN OrderItems oi
    ON o.Order_ID = oi.Order_ID
INNER JOIN MenuItems m
    ON oi.ItemCode = m.ItemCode;



USE POSDB
GO

SELECT 
    SUM(oi.Quantity * m.Price) AS TotalAmount
FROM OrderItems oi
INNER JOIN MenuItems m 
    ON oi.ItemCode = m.ItemCode
WHERE oi.Order_ID = (SELECT MAX(Order_ID) FROM Orders);


CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO users (email, password, role) VALUES 
('admin@gmail.com', '1234', 'admin'),
('user@gmail.com', '1234', 'user');


select * from users
drop table users

