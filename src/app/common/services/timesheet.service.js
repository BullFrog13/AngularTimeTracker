import Timesheet from '../models/timesheet.model.js';

export default class TimesheetService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    createTimesheet(timesheet) {
        const postEmployee = this.Restangular.all('timesheets');

        postEmployee.post(timesheet).then((result) => result);
    }

    updateTimesheet(timesheet) {
        return this.Restangular.one('timesheets', timesheet.Id).get().then((timesheetToUpdate) => {
            timesheetToUpdate.LoggedTime = timesheet.LoggedTime;
            timesheetToUpdate.Comment = timesheet.Comment;

            return timesheetToUpdate.put().then((updatedTimesheet) => {
                return new Timesheet(updatedTimesheet);
            });
        });
    }

    searchTimesheet(employeeId, projectId, taskId, startDate, endDate) {
        const timesheetBase = this.Restangular.all('timesheets');

        return timesheetBase.customGET('search', { 'query.empId': employeeId, 'query.projId': projectId, 'query.taskId': taskId, 'query.startDate': startDate, 'query.endDate': endDate }).then((filteredTimesheets) => {
            return filteredTimesheets;
        });
    }
}