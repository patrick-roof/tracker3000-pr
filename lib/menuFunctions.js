const inquirer = require('inquirer');
const mysql = require('mysql2');
const { optionsMenu } = require('../server');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'P@r061899',
        database: 'employees_db'
    }
)

const viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        (err, data) => {
            console.table(data),
            optionsMenu()
        })
    
}

const viewRoles = () => {

}

const viewEmployees = () => {

}

const addDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'text',
                name: 'dept',
                message: 'Please enter a name for this department: '
            })
            .then((data) => {
                connection.query(
                    `INSERT INTO department (name) VALUES(?)`,
                    [data.dept],
                    console.log('Department added'),
                    viewDepartments(),
                    optionsMenu()
                )
            })
}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployee = () => {

}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee }