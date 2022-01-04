const inquirer = require("inquirer");
// const cTable = require("console.table");
const chalk = require("chalk");
var figlet = require("figlet");
const db = require("./db/connection");

console.log(
  chalk.green(figlet.textSync("Employee CMS", { horizontalLayout: "full" }))
);

// menu options
const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "menuLIst",
      message: chalk.yellow(`Please make a selection from below menu.`),
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Quit",
      ],
    })
    .then((selection) => {
      switch (selection.menuLIst) {
        case "View All Departments":
          queryDepartments();
          break;
        case "View All Roles":
          queryRoles();
          break;
        case "View All Employees":
          queryEmployees();
          break;
        case "Add A Department":
          newDepartment();
          break;
        case "Add A Role":
          newRole();
          break;
        // case "Add An Employee":
        //   newEmployee();
        //   break;
        // case "Update An Employee Role":
        //   updateEmployeeRole();
        //   break;
        // case "Quit":
        //   quit();
        //   break;
        // default:
        //   console.log("Main Menu");
      }
    });
};

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const queryDepartments = () => {
  const sql = `SELECT *
  FROM department
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
    mainMenu();
  });
};

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const queryRoles = () => {
  const sql = `SELECT title, salary, department.name
  FROM role
  JOIN department
  ON department_id = department.id;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
    mainMenu();
  });
};

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const queryEmployees = () => {
  const sql = `SELECT employee.id, first_name, last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee 
  JOIN role ON role.id = employee.role_id
  JOIN department ON department.id = role.department_id;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
    mainMenu();
  });
};

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const newDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: chalk.yellow(`Please provide new department name.`),
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        data.department,
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log(
            chalk.red(`System has been updated with new department.`)
          );
          mainMenu();
        }
      );
    });
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const newRole = () => {
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const depList = data.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: chalk.yellow(`Please add name of new role.`)
        },
        {
          type: "input",
          name: "salary",
          message: chalk.yellow(`Enter yearly salary for new role.`)
        },
        {
          type: "list",
          name: "role",
          message: chalk.yellow(`Enter department role will be apart of.`),
          choices: depList
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
          [data.title, data.salary, data.role],
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log(chalk.red(`System has been updated with new role`));
            mainMenu();
          }
        );
      });
  });
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const newEmployee = () => {

  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: chalk.yellow(`Please enter employee's first name?`),
    },
    {
      type: "input",
      name: "lastName",
      message: chalk.yellow(`Please enter employee's last name?`),
    },
    {
      type: "list",
      name: "title",
      message: chalk.yellow(`Please enter employee's title?`),
    },
    {
      type: "list",
      name: "manager",
      message: chalk.yellow(`Please enter employee's manager?`),
    },
  ]);
  console.log(chalk.red("A new employee was added to the database"));
  mainMenu();
};

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database


mainMenu();
// .then(answers => {
//   console.log(answers)
// })
