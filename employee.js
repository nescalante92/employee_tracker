const mysql = require('mysql');
const inquirer = require('inquirer');
let roleArr = [];
let managerArr = [];

// require('console.table');



// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: '',
    database: 'employee_DB',
});

// connect to the mysql server and sql database
// connection.connect((err) => {
//     if (err) throw err;
//     // run the start function after the connection is made to prompt the user
//     start();
// });


// function which prompts the user for what action they should take
const start = () => {
    inquirer
        .prompt({
            name: 'home',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'View Department',
                'View Role',/*console.table()*/
                'View Employee',
                'Update Employee Role',
                'EXIT',
            ],
        })
        .then((answer) => {
            // based on their answer, choice flow
            if (answer.home === 'Add a Department') {
                postDepartment();
            } else if (answer.home === 'Add a Role') {
                postRole();
            } else if (answer.home === 'Add an Employee') {
                postEmployee();
            } else if (answer.home === 'View Department') {
                viewDepartment();
            } else if (answer.home === 'View Role') {
                viewRole();
            } else if (answer.home === 'View Employee') {
                viewEmployee();
            } else if (answer.home === 'Update Employee Role') {
                updateEmpRole();
            } else {
                exitHome();
            }
        });
};

const exitHome = () => {
    console.log('Thank you for visiting, have a nice day!');
    connection.end();
};
//-------------------postDepartment-----------------------------------------------
const postDepartment = () => {
    inquirer
        .prompt([
            {
                name: "addDepartment",
                type: "input",
                message: "Please add your Department name.",
               
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    department_name: answer.addDepartment,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your department was created successfully!');
                    console.table(answer);
                    start();
                }
            );
        });
};
// ----------------------postRole----------------------------------------------------------
const postRole = () => {
    connection.query('SELECT * FROM role', (err,res) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "addTitle",
                    type: "input",
                    message: "Please add your Role Title.",
                },
                {
                    name: "addSalary",
                    type: "input",
                    message: "Please add your Salary.",
                },

            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.addTitle,
                        salary: answer.addSalary,
                        department_id: answer.addDepartment,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Your Role was created successfully!');
                        start();
                    }
                );
            });


    });
}



// ------------------------postEmployee----------------------------------

const postEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstname",
                type: "input",
                message: "Please enter Employee First Name",
            },
            {
                name: "lastname",
                type: "input",
                message: "Please enter Employee Last Name",
            },
            {
                name: "role",
                type: "list",
                message: "What is Employee Role?",
                choices: chooseRole(),
            },
            {
                name: "manager",
                type: "list",
                message: "Who is your manager?",
                choices: chooseManager(),
                
            },
            
        ])
        .then((answer) => {
            let roleId = chooseRole().indexOf(answer.role) + 1;
            let managerId = chooseManager().indexOf(answer.manager) + 1;
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: roleId,
                    manager_id: managerId,

                },
                (err) => {
                    if (err) throw err;
                    console.table(answer);
                    start();
                }
            );
        });

};
//--------------Role quiery function------------------//
const chooseRole = ()  => {
    connection.query("SELECT * FROM role", function(err, result) {
        if (err) throw err
        for (var i = 0; i < result.length; i++) {
            roleArr.push(result[i].title);
        }
        return roleArr;
    })
}
//------------------Role quiery function-----------------//
const chooseManager = () => {
    connection.query("SELECT * FROM employee", function(err, result) {
        if (err) throw err
        for (var i = 0; i < result.length; i++) {
            managerArr.push(result[i].title);
        }
        return managerArr;
    })
}



//-----------------------------viewDepartment------------------//
const viewDepartment = () => {
    connection.query("SELECT * FROM department"),
    function (err, result) {
        if (err) throw err
        console.table(result)
        start()
    }
}

//-----------------------------viewRole------------------//
const viewRole = () => {
    connection.query("SELECT * FROM role"),
    function (err, result) {
        if (err) throw err
        console.table(result)
        start()
    }
}

//-----------------------------viewEmployee------------------//
const viewEmployee = () => {
    connection.query("SELECT * FROM employee"),
    function (err, result) {
        if (err) throw err
        console.table(result)
        start()
    }
}

//-------------------------updateEmpRole-------------------------//

// const updateEmpRole = ( => {
//     connection.query("SELECT * FROM employee"),
//     if (err) throw err
//     console.log(result)
//     inquirer
//         .prompt([
//             name: 
//         ])
// })

















































// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});




