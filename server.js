const inquirer = require('inquirer')

const EmployeeTracker = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'trackerOptions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'quit']
        }
    ])
} 