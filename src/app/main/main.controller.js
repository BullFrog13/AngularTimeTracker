import DateConverter from './services/dateConverter.service';

export default class MainController {
    constructor($filter, $uibModal, $transitions, EmployeeService, LoginService, NotificationService, ProjectService, TaskService, TimesheetService) {

        this.DateTimesheets = new Map();

        this.CurrentDate = new Date();

        this.DisplayedDates = [];
        this.PendingChangesAvailable = false;

        this.PendingCreateTimesheets = new Map();
        this.PendingUpdateTimesheets = new Map();

        this.dateConverter = new DateConverter($filter);

        for (let i = 0; i < 6; i++) {
            const keyDate = this.dateConverter.subtractDaysFromDate(this.CurrentDate, i);
            const shortDate = this.dateConverter.convertDate(keyDate, 'shortDate');

            this.DisplayedDates[i] = shortDate;

            this.DateTimesheets.set(shortDate, []);
        }
        this.DisplayedDates.reverse();

        this.$uibModal = $uibModal;
        this.EmployeeService = EmployeeService;
        this.LoginService = LoginService;
        this.NotificationService = NotificationService;
        this.ProjectService = ProjectService;
        this.TaskService = TaskService;
        this.TimesheetService = TimesheetService;

        this.CurrentUserProjects = [];

        this.currentUser = this.LoginService.getCurrentUser();

        if (this.currentUser !== null) {
            this._setProjects(this.currentUser.Id)
        }

        this.NotificationService.addListener('userLoggedIn', (user) => {
            this.currentUser = user;
            this._setProjects(user.Id)
        });

        this.NotificationService.addListener('userLoggedOut', () => {
            this.CurrentUserProjects = [];
        });

        $transitions.onStart({ from: 'app' }, (transition) => {
            const promise = new Promise(() => {});
            let destinatonStateName = transition.$to().name;

            if (this.PendingChangesAvailable) {
                transition.router.stateService.transitionTo('app');
                const modal = this.$uibModal.open({
                    component: 'unsavedChangesModal',
                    backdrop: 'static'
                });

                modal.result.then((result) => {
                    if (result) {
                        this.PendingCreateTimesheets = [];
                        this.PendingUpdateTimesheets = [];
                        this.PendingChangesAvailable = false;

                        transition.router.stateService.transitionTo(destinatonStateName);

                        promise.resolve();
                    } else {
                        promise.reject();
                    }

                    return promise;
                });
            }
        });
    }

    _setProjects(userId) {
        this.EmployeeService.getEmployeeProjects(userId).then((projects) => {
            this.CurrentUserProjects = projects;
        });
    }

    _setTicketTimesheets(ticketTimesheets) {
        this.DisplayedDates.forEach((displayedDate) => {
            const displayedShortDate = this.dateConverter.convertDate(displayedDate, 'shortDate');

            ticketTimesheets.forEach((timesheet) => {
                const timesheetShortDate = this.dateConverter.convertDate(timesheet.Date, 'shortDate');

                if (displayedShortDate === timesheetShortDate) {
                    let value = this.DateTimesheets.get(displayedShortDate);
                    value.push(timesheet);
                }
            });
        });
    }

    moveCurrentDaysBack() {
        this.DateTimesheets.clear();

        for (let i = 0; i < 6; i++) {
            const subtractedDate = this.dateConverter.subtractDaysFromDate(this.DisplayedDates[i], 6);
            const shortDate = this.dateConverter.convertDate(subtractedDate, 'shortDate');

            this.DisplayedDates[i] = shortDate;

            this.DateTimesheets.set(shortDate, []);
        }

        this.CurrentUserProjects.forEach((project) => {
            if (project.opened) {
                this.loadTicketsForProject(project);
            } else {
                project.loaded = false;
            }
        });
    }

    moveCurrentDaysForward() {
        this.DateTimesheets.clear();

        for (let i = 0; i < 6; i++) {
            const addedDate = this.dateConverter.addDaysToDate(this.DisplayedDates[i], 6);
            const shortDate = this.dateConverter.convertDate(addedDate, 'shortDate');

            this.DisplayedDates[i] = shortDate;

            this.DateTimesheets.set(shortDate, []);
        }

        this.CurrentUserProjects.forEach((project) => {
            if (project.opened) {
                this.loadTicketsForProject(project);
            } else {
                project.loaded = false;
            }
        });
    }

    getTaskTimesheetForDate(taskId, date) {
        const dateTimesheets = this.DateTimesheets.get(date);

        if (dateTimesheets) {
            for (let i = 0; i < dateTimesheets.length; i++) {
                if (dateTimesheets[i].TicketId === taskId) {
                    return dateTimesheets[i];
                }
            }
        }
    }

    loadTicketsForProject(project) {
        project.loading = true;

        this.TaskService.searchTask(this.currentUser.Id, project.Id).then((tickets) => {
            tickets.forEach((ticket) => {
                this.TimesheetService.searchTimesheet(this.currentUser.Id, project.Id, ticket.Id, this.DisplayedDates[0], this.DisplayedDates[5]).then((filteredTimesheets) => {
                    ticket.TimeSheets = filteredTimesheets;
                    this._setTicketTimesheets(filteredTimesheets);

                    project.loading = false;
                    project.loaded = true;
                });
            });

            project.Tickets = tickets;
        });
    }

    pushCreatedTimesheet(uniqueKey, ticketId, hours, date) {
        this.PendingCreateTimesheets.set(uniqueKey, { 'TicketId': ticketId, 'LoggedTime': hours, 'Date': date });

        this.PendingChangesAvailable = true;
    }

    pushUpdatedTimesheet(uniqueKey, timesheet, time) {
        timesheet.LoggedTime = time;
        this.PendingUpdateTimesheets.set(uniqueKey, timesheet);

        this.PendingChangesAvailable = true;
    }

    savePendingTimesheets() {
        this.PendingUpdateTimesheets.forEach((timesheet) => {
            this.TimesheetService.updateTimesheet(timesheet);
        });

        this.PendingCreateTimesheets.forEach((timesheet) => {
            this.TimesheetService.createTimesheet(timesheet);
        });

        this.PendingChangesAvailable = false;
    }

    openCreateNewTimesheetModal(date, taskId, taskName, time, projectId) {
        const modal = this.$uibModal.open({
            component: 'newTimesheetModal',
            backdrop: 'static',
            resolve: {
                date: () => {
                    return date;
                },
                taskId: () => {
                    return taskId;
                },
                taskName: () => {
                    return taskName;
                },
                time: () => {
                    return time;
                }
            }
        });

        modal.result.then((timesheet) => {
            this._addTimesheetToTicket(timesheet, projectId);
            this._addTimesheetToTable(timesheet);
        });
    }

    openEditTimesheetModal(timesheet) {
        const modal = this.$uibModal.open({
            component: 'editTimesheetModal',
            backdrop: 'static',
            resolve: {
                timesheet: () => {
                    return timesheet;
                }
            }
        });

        modal.result.then((updatedTimesheet) => {
            if (updatedTimesheet) {
                timesheet = updatedTimesheet;

                this._editTimesheetInTable(timesheet);
            }
        });
    }

    getProjectDayHours(projectId, date) {
        let total = 0;
        const allTimesheets = angular.element(document.querySelectorAll('[date]'));

        for (let i = 0; i < allTimesheets.length; i++) {
            let test2 = allTimesheets[i].attributes.date.value;
            if (test2 === date) {
                total += +allTimesheets[i].value;
            }
        }

        return total;
    }

    _addTimesheetToTicket(timesheet, projectId) {
        for (let i = 0; i < this.CurrentUserProjects.length; i++) {
            if (this.CurrentUserProjects[i].Id === projectId) {
                for (let j = 0; j < this.CurrentUserProjects[i].Tickets.length; j++) {
                    if (this.CurrentUserProjects[i].Tickets[j].Id === timesheet.TicketId) {
                        this.CurrentUserProjects[i].Tickets[j].TimeSheets.push(timesheet);
                        break;
                    }
                }
                break;
            }
        }
    }

    _addTimesheetToTable(timesheet) {
        const timesheetShortDate = this.dateConverter.convertDate(timesheet.Date, 'shortDate');
        let value = this.DateTimesheets.get(timesheetShortDate);
        value.push(timesheet);
    }

    _editTimesheetInTable(timesheet) {
        const timesheetShortDate = this.dateConverter.convertDate(timesheet.Date, 'shortDate');
        let value = this.DateTimesheets.get(timesheetShortDate);

        for (let i = 0; i < value.length; i++) {
            if (value[i].Id === timesheet.Id) {
                value[i] = timesheet
            }
        }
    }
}