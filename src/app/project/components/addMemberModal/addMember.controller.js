export default class AddMemberModalController {
    constructor(EmployeeService, TeamService) {
        this.EmployeeService = EmployeeService;
        this.TeamService = TeamService;
    }

    $onInit() {
        this.project = this.resolve.project;
        this.members = this.resolve.members;
    }

    getUsers(searchString) {
        return this.EmployeeService.searchEmployees(searchString).then((employees) => {

            this.members.forEach((member) => {
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].Id === member.Id) {
                        employees.splice(i, 1);
                        break;
                    }
                }
            });

            return employees.map((employee) => {
                return employee;
            });
        });
    }

    addMember() {
        this.TeamService.addEmployeeToTeam(this.newMember.Id, this.project.Id).then(() => {
            this.close({ $value: this.newMember.Id });
        });
    }
}