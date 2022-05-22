const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const db = require('./db/connection')



const EmployeeTracker = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'trackerOptions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View all managers', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'quit']
        }
    ]).then((ans) => {
        if (ans.trackerOptions == 'View all departments') {
            viewAllDepartments()
        } else if (ans.trackerOptions == "View all roles") {
            viewAllRoles()
        } else if (ans.trackerOptions == "View all employees") {
            viewAllEmployees()
        } else if (ans.trackerOptions == "Add a department") {
            addDepartment()
        } else if (ans.trackerOptions == "Add a role") {
            addRole()
        } else if (ans.trackerOptions == "Add an employee") {
            addEmployee()
        } else if (ans.trackerOptions == "Update employee role") {
            updateEmployee()
        } else {
            quitTracker()
        }
    })
};

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result)
        EmployeeTracker()
    })
};

const viewAllRoles = () => {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result)
        EmployeeTracker()
    })
};

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee JOIN roles WHERE employee.roles_id = roles.id`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result)
        EmployeeTracker()
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "depName",
            message: "Enter new department name"
        }
    ]).then((ans) => {
        db.query(`INSERT INTO department (dep_name) VALUES (?)`, [ans.depName], (err, results) => {
            if (err) {
                console.log(err)
            }
            viewAllDepartments()
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the role you will like to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this role?"
        },
        {
            name: "list",
            name: "roleDep",
            message: "What department is this role apart of?",
            choices: [viewAllDepartments()]
        }
    ]).then((ans) => {
        db.query(`INSERT INTO roles (title, salary, department) VALUES (?,?,?)`, [ans.roleName, ans.roleSalary, ans.roleDep], (err, results) => {
            if (err) {
                console.log(err)
            } viewAllRoles()
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter new employees first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter new employees last name"
        },
        {
            type: "input",
            name: "emplyRole",
            message: "What role would you like to assign the employee?",
            choices: [viewAllRoles()]
        },
        {
            type: "list",
            name: "assignDept",
            message: "What department?",
            choices: [viewAllDepartments()]
        },
        {
            type: "input",
            name: "assignManager",
            message: "Who is the new employee's manager?",
            choices: [viewAllManagers()]
        },
    ]).then((ans) => {
        db.query(`INSERT INTO employee (first_name, last_name, roles_id) VALUES(?,?,?,?,?)`, [ans.firstName, ans.lastName, ans.emplyRole, ans.assignDept, ans.assignManager], (err, results) => {
            if (err) {
                console.log(err)
            } viewAllEmployees()
        })
    })
};

const updateEmployee = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'selectEmployee',
            message: 'Which employee would you like to update?',
            choices: [viewAllEmployees()]
        },
        {
            type:'list',
            name:'selectRole',
            message:'What role would you like to assign this employee',
            choices: [viewAllRoles()]
        }
    ]).then((ans) => {
        db.query(`UPDATE employee SET role_id = ?  WHERE id = ?`, [ans.selectRole, ans.selectEmployee], (err, results) => {
            if (err) {
                console.log(err)
            } viewAllEmployees()
        })
    })
};

const quitTracker = () => {
 db.query(`quit`)
}


EmployeeTracker()