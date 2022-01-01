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
        // case "Add A Department":
        //   addDepartment();
        //   break;
        // case "Add A Role":
        //   addRole();
        //   break;
        // case "Add An Employee":
        //   addEmployee();
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

// Query all departments - formatted table showing department names and department ids
// const allDepartments ?
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
}

// Query all roles - formatted table showing job title, role id, the department that role belongs to, and the salary for that role
// const allRoles ?
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
}


// Query all employees - formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// const allEmployees ?
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
}

// add department - employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// const addDepartment ?


// add role - prompted to enter the name, salary, and department for the role and that role is added to the database
// const addRole ?


// add employee - prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// const addEmployee ?
//Adding a new Employee to the database;
const addEmployee = () => {
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

// update employee - prompted to select an employee to update and their new role and this information is updated in the database
// const updateEmployeeRole ?

mainMenu()
// .then(answers => {
//   console.log(answers)
// })