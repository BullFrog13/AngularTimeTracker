export default class DashboardController {
    constructor($scope, $uibModal, dragulaService, TicketStatusService, ProjectService, EmployeeService, LoginService, TaskService) {
        dragulaService.options($scope, '0', {
            removeOnSpill: true,
            accepts: () => {
                return true
            }
        });

        this.ProjectService = ProjectService;
        this.taskService = TaskService;
        this.$uibModal = $uibModal;

        const currentUser = LoginService.getCurrentUser();
        this.ticketStatuses = [];
        this.projects = [];
        this.selectedProject = {};

        this.Open = [];
        this.Development = [];
        this.QA = [];
        this.Test = [];
        this.Closed = [];

        this.ticketStatuses = TicketStatusService.getTicketStatuses();

        EmployeeService.getEmployeeProjects(currentUser.Id).then((projects) => {
            if (projects.length !== 0) {
                this.projects = projects;

                this.selectedProject = projects[0];

                ProjectService.getProjectTickets(this.selectedProject.Id).then((tickets) => {
                    this._bindLoadedTicketsToContainers(tickets);
                });
            }
        });

        $scope.$on('another-bag.drop-model', (e, el, target, source) => {
            let ticketId = Number(el.attr('ticket-id'));
            let statusAfterDrag = target.attr('status-id');
            let statusBeforeDrag = source.attr('status-id');

            if (statusAfterDrag !== statusBeforeDrag) {
                this.taskService.updateTaskStatus(ticketId, statusAfterDrag).then((updatedTicket) => {
                    const chosenContainer = this._getContainerByStatusId(updatedTicket.Status.Id);
                    this._updateTicketInContainer(updatedTicket, chosenContainer);
                });
            }
        });
    }

    switchProject() {
        this.ProjectService.getProjectTickets(this.selectedProject.Id).then((tickets) => {
            this._bindLoadedTicketsToContainers(tickets);
        });
    }

    openCreateTaskModal() {
        const modal = this.$uibModal.open({
            component: 'createTask',
            backdrop: 'static',
            resolve: {
                project: () => {
                    return this.selectedProject;
                }
            }
        });

        modal.result.then((createdTicket) => {
            this._addTicketToContainer(createdTicket);
        });
    }

    openEditTaskModal(ticket) {
        const modal = this.$uibModal.open({
            component: 'editTask',
            backdrop: 'static',
            resolve: {
                project: () => {
                    return this.selectedProject;
                },
                task: () => {
                    return ticket;
                }
            }
        });

        modal.result.then((editedTicket) => {
            if (editedTicket) {
                this._editTicketInContainer(editedTicket);
            }
        });
    }

    deleteTask(task) {
        this.taskService.deleteTask(task.Id).then(() => {
            this._deleteTicketFromContainer(task.Id, task.StatusId);
        });
    }

    _bindLoadedTicketsToContainers(tickets) {
        this._resetContainers();

        tickets.forEach((ticket) => {
            const chosenContainer = this._getContainerByStatusId(ticket.StatusId);
            chosenContainer.push(ticket);
        });
    }

    _deleteTicketFromContainer(taskId, statusId) {
        const chosenContainer = this._getContainerByStatusId(statusId);

        if (chosenContainer) {
            this._removeTicketFromArrayById(taskId, chosenContainer);
        }
    }

    _addTicketToContainer(ticket) {
        const chosenContainer = this._getContainerByStatusId(ticket.StatusId);

        chosenContainer.push(ticket);
    }

    _editTicketInContainer(ticket) {
        const chosenContainer = this._getContainerByStatusId(ticket.StatusId);

        this._updateTicketInContainer(ticket, chosenContainer);
    }

    _getContainerByStatusId(statusId) {
        let chosenContainer;

        switch (statusId) {
            case 1:
                chosenContainer = this.Open;
                break;
            case 2:
                chosenContainer = this.Development;
                break;
            case 3:
                chosenContainer = this.QA;
                break;
            case 4:
                chosenContainer = this.Test;
                break;
            case 5:
                chosenContainer = this.Closed;
                break;
        }

        return chosenContainer;
    }

    _resetContainers() {
        this.Open = [];
        this.Development = [];
        this.QA = [];
        this.Test = [];
        this.Closed = [];
    }

    _removeTicketFromArrayById(ticketId, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].Id === ticketId) {
                array.splice(i, 1);
                break;
            }
        }
    }

    _updateTicketInContainer(ticket, container) {
        for (let i = 0; i < container.length; i++) {
            if (container[i].Id === ticket.Id) {
                container[i] = ticket;
                break;
            }
        }
    }
}