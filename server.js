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
    db.query("SELECT * FROM department", (err, result) => {
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "what is the name of this role?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary for this role?"
            },
            {
                type: "list",
                name: "depTarget",
                message: "Which department this role belongs to?",
                choices: result.map((dep) => {
                    return {
                        name: dep.dep_name,
                        value: dep.id
                    }
                })
            }
        ]).then(ans => {
            console.log(ans)
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [ans.roleName, ans.roleSalary, ans.depTarget,], (err, results) => {
                if (err) {
                    console.log(err)
                } viewAllRoles()
            })
        })
    })
};

const addEmployee = () => {
    db.query(`SELECT * FROM roles `, `SELECT * FROM employee WHERE roles BETWEEN 12 and 15 `, (err, result) => {
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
                type: "list",
                name: "addRole",
                message: "What role do ypu want to assign this employee?",
                choices: result.map((roles) => {
                    return {
                        name: roles.title,
                        value: roles.id
                    }
                })
            },
            {
                type:'list',
                name:"assignManager",
                message: "Assign manager id to employee",
                choices:result.map((roles) => {
                    return {
                        name: roles.id,
                        value: roles.id
                    }
                })
            },
        ]).then((ans) => {
            db.query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES(?,?,?,?)`, [ans.firstName, ans.lastName, ans.addRole, ans.assignManager], (err, results) => {
                if (err) {
                    console.log(err)
                } viewAllEmployees()
            })
        })
    })
};

const updateEmployee = () => {
db.query("SELECT * FROM employee", (err, result) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectEmployee',
            message: 'Which employee would you like to update?',
            choices:result.map((roles) => {
                return {
                    name: roles.title,
                    value: roles.id
                }
            })
        },
        {
            type: 'newRole',
            name: 'selectRole',
            message: 'What role would you like to assign this employee'
        }
    ]).then((ans) => {
        db.query(`UPDATE employee SET role_id = ?  WHERE id = ?`, [ans.newRole, ans.selectEmployee], (err, results) => {
            if (err) {
                console.log(err)
            } viewAllEmployees()
        })
    })
})
};




EmployeeTracker()