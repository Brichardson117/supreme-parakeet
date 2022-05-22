INSERT INTO department (dep_name)
VALUES 
('Sales'),
('Engineer'),
('Finance'),
('Legal');

INSERT INTO roles(title, salary, department_id)
VALUES
 ("Collection Agent", 40000, 1),
 ("Sales Consultant", 60000, 1),
 ("Account executive", 70000, 1),
 ("Junior Software Engineer", 70000, 2),
 ("Senior Software Enigneer", 90000, 2),
 ("Finance Assistant", 30000, 3),
 ("Purchasing Agent", 34000, 3),
 ("Paralegal", 48000, 4),
 ("Legal Secretary", 39000, 4),
 ("Legal Assistant", 40000, 4),
 ("Attorney", 95000, 4),
 ("Manager", 99000, 4);



INSERT INTO employee (first_name, last_name, roles_id, manager_id )
VALUES
("All", "Might", 12, NULL), 
("Todoroki", "Shoto", 12, NULL),
("Luffy", "Monkey D", 12, NULL),
("Midoriya", "Izuku", 12, NULL ),
("Ernest", "Hemingway", 1, 1),
("Robin", "Nico", 9, 1),
("Harper", "Lee", 3, 1), 
("William", "Shakespeare", 6, 1),
("Emily", "Bronte", 2, 2),
("Rebecca", "Hobson", 5, 2),
("Nakatsukasa", "Tsubaki", 7, 2),
("William", "Butler-Yeats", 8, 2),
("Trish", "Yates", 11, 3),
("Xiao", "Dugas", 10, 3),
("Idalia", "Ochoa", 4, 3),
("Angelita", "Encarnacion", 8, 3),
("Masa", "Horiguchi", 10, 4 ),
("Robert", "Frost", 1, 4),
("John", "Steinbeck", 11, 4),
("Franken", "Stein", 5, 4);





