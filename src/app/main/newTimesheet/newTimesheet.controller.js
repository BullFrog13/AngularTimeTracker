export default class NewTimesheetController {
    constructor($filter, TimesheetService) {
        this.TimesheetService = TimesheetService;
        this.$filter = $filter;
    }

    $onInit() {
        this.date = this.resolve.date;
        this.taskId = this.resolve.taskId;
        this.taskName = this.resolve.taskName;
        this.time = this.resolve.time;
    }

    close() {
        this.close();
    }

    createTimesheet() {
        const datee = new Date(this.date);
        let originalTime = this.$filter('date')(datee.getTime(), 'yyyy-MM-ddTHH:mm:ss')

        this.timesheet.Date = originalTime;
        this.timesheet.TicketId = this.taskId;
        this.TimesheetService.createTimesheet(this.timesheet);

        this.close({ $value: this.timesheet });
    }
}