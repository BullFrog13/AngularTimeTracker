import Employee from '../models/employee.model';
import Project from '../models/project.model';

export default class EmployeeService {

    constructor(Restangular) {
        this.Restangular = Restangular;

        this.baseEmployees = this.Restangular.all('employees');
    }

    getEmployees() {
        return this.baseEmployees.getList().then((employees) => {
            const employeesResult = [];

            employees.forEach((employee) => {
                const newEmployee = new Employee(employee);
                employeesResult.push(newEmployee);
            });

            return employeesResult;
        });
    }

    getEmployee(employeeId) {
        return this.Restangular.one('employees', employeeId).get().then((employee) => {
            const result = new Employee(employee);

            return result;
        });
    }

    getEmployeeProjects(id) {
        this.baseEmployees = this.Restangular.one('employees', id);

        return this.baseEmployees.getList('projects').then((employeeProjects) => {
            const projects = [];

            employeeProjects.forEach((employeeProject) => {
                const project = new Project(employeeProject);
                projects.push(project);
            });

            return projects;
        });
    }

    createEmployee(employee) {
        const newEmployee = new Employee(employee);

        this.baseEmployees.post(newEmployee);
    }

    searchEmployees(searchString, projectId) {
        const base = this.Restangular.all('employees');

        return base.customGET('search', { key: searchString, projectId: projectId }).then((filteredEmployees) => {
            const employees = [];

            filteredEmployees.forEach((filteredEmployee) => {
                const employee = new Employee(filteredEmployee);
                employees.push(employee);
            });

            return employees;
        });
    }

    editEmployee(employee) {
        return this.Restangular.one('employees', employee.Id).get().then((employeeToUpdate) => {
            return employeeToUpdate.customPUT(employee).then((updatedEmployee) => {
                const result = new Employee(updatedEmployee);

                return result;
            });
        });
    }
}