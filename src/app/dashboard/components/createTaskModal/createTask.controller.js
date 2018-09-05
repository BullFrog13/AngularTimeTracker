export default class CreateTaskModalController {
    constructor(TaskService, TicketTypeService, EmployeeService) {
        this.TaskService = TaskService;
        this.EmployeeService = EmployeeService;

        this.ticketTypes = [];

        this.ticketTypes = TicketTypeService.getTicketTypes();
    }

    $onInit() {
        this.project = this.resolve.project;
    }

    getUsers(searchString) {
        return this.EmployeeService.searchEmployees(searchString, this.project.Id).then((employees) => {
            return employees.map((employee) => {
                return employee;
            });
        });
    }

    close() {
        this.close();
    }

    createTask() {
        this.task.ResponsibleId = this.task.Responsible.Id;
        this.task.ReporterId = this.task.Reporter.Id;
        this.task.StatusId = 1;
        this.task.ProjectId = this.project.Id;

        this.TaskService.createTask(this.task).then((createdTask) => {
            this.close({ $value: createdTask });
        });
    }
}