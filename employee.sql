DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,/**/
    title VARCHAR(30), /*to hold role title*/
    salary DECIMAL NOT NULL, /*to hold role salary*/
    department_id INT, /*to hold reference to department role belongs to*/
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30), /*to hold employee first name*/
    last_name VARCHAR(30), /*to hold employee last name*/
    role_id INT, /*to hold reference to role employee has*/
    manager_id INT, /*to hold reference to another employee that manages the employee being Created. 
    This field may be null if the employee has no manager*/
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

/*--------------Department SEEDS---------------------*/
INSERT INTO department (name)
VALUE ('Accounting');
INSERT INTO department (name)
VALUE ('Sales');
INSERT INTO department (name)
VALUE ('Human Resource');
INSERT INTO department (name)
VALUE ('Customer Service');
INSERT INTO department (name)
VALUE ('Legal');
INSERT INTO department (name)
VALUE ('I.T');
INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name)
VALUE ('Design');
INSERT INTO department (name)
VALUE ('Engineering');
INSERT INTO department (name)
VALUE ('Marketing');

/*----------------Employee Role SEEDS------------------*/

INSERT INTO role (title, salary, department_id)
VALUE ('Accountant', 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Salesman', 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('H.R Associate', 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Customer Service Associate', 50000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Lawer', 100000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ('I.T Consultant', 48000, 6);
INSERT INTO role (title, salary, department_id)
VALUE ('Financial Advisor', 90000, 7);
INSERT INTO role (title, salary, department_id)
VALUE ('Senior UX Designer', 120000, 8);
INSERT INTO role (title, salary, department_id)
VALUE ('Electrical Engineer', 98000, 9);
INSERT INTO role (title, salary, department_id)
VALUE ('Team Lead Marketing', 115000, 10);

/*--------------------Employee SEEDS--------------*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Peter', 'Parker', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Bruce', 'Banner', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Natasha', 'Romanoff', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Diana', 'Prince', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Bruce', 'Wayne', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Wally', 'West', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Carol', 'Danvers', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Steve', 'Rogers', 8, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Peter', 'Parker', 9, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Tony', 'Stark', 10, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 
