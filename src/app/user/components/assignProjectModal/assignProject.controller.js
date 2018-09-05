export default class AssignProjectModalController {
    constructor(EmployeeService, TeamService, ProjectService) {
        this.EmployeeService = EmployeeService;
        this.TeamService = TeamService;
        this.ProjectService = ProjectService;

        this.availableProjects = [];
        this.selectedProjectId;
    }

    $onInit() {
        this.user = this.resolve.user;

        this.ProjectService.getAllProjects().then((allProjects) => {
            this.EmployeeService.getEmployeeProjects(this.user.Id).then((assignedProjects) => {
                assignedProjects.forEach((assignedProject) => {
                    for (let i = 0, j = 0; i < allProjects.length; i++) {
                        if (assignedProject.Id === allProjects[i].Id) {
                            allProjects.splice(i - j, 1);
                            j++;
                        }
                    }
                });

                this.availableProjects = allProjects;
            });
        });
    }

    assignProject() {
        this.TeamService.addEmployeeToTeam(this.user.Id, this.selectedProjectId).then(() => {
            this.close({ $value: this.selectedProjectId });
        });
    }
}