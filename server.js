const inquirer = require('inquirer');
const mysql = require('mysql2');
// const console = require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'P@r061899',
        database: 'employees_db'
    }
)

function startApp() {
    optionsMenu();
}

const optionsMenu = () => {
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

const viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        (err, data) => {
            console.table(data),
            optionsMenu()
        })
    
}

const viewRoles = () => {
    connection.query(
        `SELECT role.id, role.title, role.salary, department.name
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`,
        (err, results) => {
            console.table(results);
            optionsMenu()
        })
}

const viewEmployees = () => {
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, 
        role.salary AS salary, department.name AS department
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id`,
        (err, results) => {
            console.table(results);
            optionsMenu();
        })
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
                    console.table(data),
                    optionsMenu()
                )
            })
}

const addRole = () => {
    connection.query(
        `SELECT * FROM department`,
        (err, results) => {
            let departmentArr = [];
            results.forEach(item => {
                departmentArr.push(item.name)
            })
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'role_title',
                        message: 'Please enter the role title: '
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the salary for this role: '
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Choose which department the new role corresponds to: ',
                        choices: departmentArr
                    },
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i< departmentArr.length; i++) {
                        if (departmentArr[i] === data.department) {
                            department_id = i + 1;
                        };
                    };

                    connection.query(
                        `INSERT INTO role (title, salary, department_id)
                        VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        (err, results) => {
                            console.log('Added role'),
                            optionsMenu();
                        }
                    )
                })
        }
    )
}

const addEmployee = () => {
    connection.query(
        `SELECT * FROM role`,
        (err, results) => {
            let roleArr = [];

            results.forEach((employee) => {
                roleArr.push(`${employee.title}`);
            });
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'What is the employees first name?'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is the employees last name?'
                        },
                        {
                            type: 'list',
                            name: 'employeeRole',
                            message: 'Please select a role for the employee: ',
                            choices: roleArr
                        },
                    ])
                    .then((data) => {
                        let role_id;
                        for (i = 0; i < roleArr.length; i++) {
                            if (data.employeeRole === roleArr[i]) {
                                role_id = i + 1
                            }
                        }
                        connection.query(
                            `INSERT INTO employee (first_name, last_name, role_id)
                            VALUES (?, ?, ?)`,
                            [data.first_name, data.last_name, role_id],
                            (err, results) => {
                                console.log('Added employee'),
                                optionsMenu();
                            }
                        )
                    })
                
            
        }
    )
}

const updateEmployee = () => {

}


startApp();