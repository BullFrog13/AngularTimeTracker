import Employee from '../models/employee.model';

export default class TeamService {

    constructor(Restangular) {
        this.Restangular = Restangular;

        this.baseEmployees = this.Restangular.all('team');
    }

    getTeam(projectId) {
        return this.Restangular.one('team', projectId).getList().then((members) => {
            const result = [];

            members.forEach((member) => {
                const employee = new Employee(member);
                result.push(employee);
            });

            return result;
        });
    }

    addEmployeeToTeam(employeeId, projectId) {
        return this.baseEmployees.customPOST({ ProjectId: projectId, EmployeeId: employeeId }).then((result) => {
            return result;
        });
    }

    removeEmployeeFromTeam(employeeId, projectId) {
        return this.baseEmployees.customDELETE('', { ProjectId: projectId, EmployeeId: employeeId }).then((result) => {
            return result;
        });
    }
}