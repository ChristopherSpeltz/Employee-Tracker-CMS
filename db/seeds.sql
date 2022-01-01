INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Information Technology'),
  ('Legal'),
  ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Customer Service', 55000, 1),
  ('Recruiter', 75000, 6),
  ('Account Manager', 90000, 1),
  ('Accountant', 150000, 3),
  ('Lawyer', 200000, 5),
  ('Social Media Strategist', 90000, 2),
  ('Developer', 160000, 4),
  ('Engineer', 160000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 3, 1),
  ('Robert', 'Bruce', 5, NULL),
  ('Peter', 'Greenaway', 4, 1),
  ('Derek', 'Jarman', 2, 1),
  ('Paolo', 'Pasolini', 4, 3),
  ('Heathcote', 'Williams', 1, 3),
   ('Samuel', 'Delany', 6, 2),
  ('Tony', 'Duvert', 3, NULL),
  ('Dennis', 'Cooper', 4, 2),
  ('Monica', 'Bellucci', 1, 2),
  ('Samuel', 'Johnson', 6, 2),
  ('William', 'Morris', 2, 1);