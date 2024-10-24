import inquirer from 'inquirer';
import 'console.table';

import { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addEmployee, updateEmployeeRole } from './query.js';

export async function showMainMenu() {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ],
    });

    switch (action) {
        case 'View All Departments':
            console.table(await getAllDepartments());
            break;
        case 'View All Roles':
            console.table(await getAllRoles());
            break;
        case 'View All Employees':
            console.table(await getAllEmployees());
            break;
        case 'Add a Department':
            const {departmentName} = await inquirer.prompt({
                name: 'departmentName',
                type: 'input',
                message: 'What is the name of the department?',

            });
            await addDepartment(departmentName);
            console.log(`Added department: ${departmentName}`);
            break;
        case 'Add a Role':
            const departments = await getAllDepartments();
            const employees = await getAllEmployees();
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                { name: 'first_name', type: 'input', message: 'Enter the first name of the employee:' },
                { name: 'last_name', type: 'input', message: 'Enter the last name of the employee:' },
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Select the role for the employee:',
                    choices: departments.map(department => ({ name: department.name, value: department.id })),
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    message: 'Select the employee manager:',
                    choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))),
                },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            console.log(`Added employee: ${first_name} ${last_name}`);
            break;
        case 'Update an employee role':
            const allEmployees = await getAllEmployees();
            const allRoles = await getAllRoles();
            const {employee_id, new_role_id} = await inquirer.prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'Selet employee to update:',
                    choices: allEmployees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
                },
                {
                    name: 'new_role_id',
                    type: 'list',
                    message: 'Select new role for the employee:',
                    choices: allRoles.map((role => ({name: role.title, value: role.id}))),
                },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            console.log('Updated employees role');
            break;
        case 'Quit':
            console.log('\nThanks for using the Employee Tracker App!\n')
            process.exit();

    }
    
    showMainMenu();
}