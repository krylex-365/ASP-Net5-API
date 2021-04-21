
INSERT INTO Accounts(AccountId, UserName, Password, Avatar, RoleId, Status) VALUES
('3', 'user2', '123', 'default.jpg', '2', '0'),
('4', 'user3', '123', 'default.jpg', '2', '0');

INSERT INTO Customers(CustomerId, Mail, PhoneNumber, Name, Address, Birthday, Sex, AccountId, Status) VALUES
('2', 'trantuan@gmail.com', '12345678', 'Trần Tuấn', '1234567890', '2020-05-11', 'Nam', '2', '0'),
('3', 'lean@gmail', '222222', 'Lê An', '456456', '2020-05-11', 'Nam', '3', '0'),
('4', 'minhducgmail', '789789', 'Minh Đức', '123456', '2020-05-11', 'Nam', '4', '0');

INSERT INTO Subcategories(SubcategoryId, CategoryId, Name, Status) VALUES
('2', '3', 'Toys 2', '0'),
('3', '3', 'Toys 3', '0'),
('5', '1', 'Man Clothes 2', '0'),
('6', '1', 'Man Clothes 3', '0'),
('7', '1', 'Woman Clothes 1', '0'),
('8','1', 'Woman Clothes 2', '0'),
('9', '1', 'Woman Clothes 3', '0');

INSERT INTO Products(ProductId, Name, Price, SubcategoryId, Description, Image, Sale, Status, Quantity) VALUES
('2', 'Calvin Klein Short', '154000', '4', 'San pham thu hai', '2.jpg', '20', '1', '100'),
('3', 'Louis Vuitton Perfume', '268000', '3', 'San pham thu ba', '3.jpg', '0', '1', '100'),
('4', 'Channels Short', '682000', '7', 'San pham thu tu', '4.jpg', '10', '1', '122');
