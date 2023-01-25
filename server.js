const inquirer = require('inquirer');
const console = require('console.table');

const menuFunctions = require('./lib/menuFunctions')

function startApp() {
    optionsMenu();
}

const optionsMenu = () => {
    console.log('Menu:');
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'userMenu',
                message: 'Please select how you would like to proceed:',
                choices: ['View all departments', 'View all roles', 'View all employees', 
                'Add department', 'Add role', 'Add employee', 'Update Employee Role']
            }
        )
        .then(chosenStep => {
            switch (chosenStep.userMenu) {
                case 'View all departments':
                    viewDepartments();
                    break
                case 'View all roles':
                    viewRoles();
                    break
                case 'View all employees':
                    viewEmployees();
                    break
                case 'Add department':
                    addDepartment();
                    break
                case 'Add role':
                    addRole();
                    break
                case 'Add employee':
                    addEmployee();
                    break
                case 'Update Employee Role':
                    updateEmployee();
                    break
                default:
                    optionsMenu();
            }
        })
};

module.exports = { optionsMenu }

startApp();