export default class TimesheetModalController {
    constructor(TimesheetService) {
        this.TimesheetService = TimesheetService;
    }

    $onInit() {
        this.timesheet = angular.copy(this.resolve.timesheet);
    }

    cancel() {
        this.close();
    }

    updateTimesheet() {
        this.TimesheetService.updateTimesheet(this.timesheet);

        this.close({ $value: this.timesheet });
    }
}