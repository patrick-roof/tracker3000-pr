const inquirer = require('inquirer');
const mysql = require('mysql2');
const { optionsMenu } = require('../server');

const connection = mysql.createConnection(
    process.env.DB_USER,
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
    }
)

const viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`
        .then((data) => {
            console.table(data),
            optionsMenu()
        })
    )
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