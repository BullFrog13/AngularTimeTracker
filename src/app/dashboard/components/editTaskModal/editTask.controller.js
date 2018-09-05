export default class EditTaskModalController {
    constructor(TicketTypeService, EmployeeService, TaskService) {
        this.EmployeeService = EmployeeService;
        this.TicketTypeService = TicketTypeService;
        this.TaskService = TaskService;

        this.ticketTypes = [];
    }

    $onInit() {
        this.project = this.resolve.project;
        this.task = angular.copy(this.resolve.task);

        this.EmployeeService.getEmployee(this.task.ResponsibleId).then((employee) => {
            this.task.Responsible = employee;
        });

        this.EmployeeService.getEmployee(this.task.ReporterId).then((employee) => {
            this.task.Reporter = employee;
        });

        this.ticketTypes = this.TicketTypeService.getTicketTypes();

        for (let i = 0; i < this.ticketTypes.length; i++) {
            if (this.ticketTypes[i].Id === this.task.TypeId) {
                this.task.TicketType = this.ticketTypes[i];
                break;
            }
        }
    }

    getUsers(searchString) {
        return this.EmployeeService.searchEmployees(searchString, this.project.Id).then((employees) => {
            return employees.map((employee) => {
                return employee;
            });
        });
    }

    editTask() {
        this.task.ResponsibleId = this.task.Responsible.Id;
        this.task.ReporterId = this.task.Reporter.Id;
        this.task.TypeId = this.task.TicketType.Id;

        this.TaskService.updateTask(this.task).then((editedTask) => {
            this.close({ $value: editedTask });
        });
    }

    close() {
        this.close();
    }
}