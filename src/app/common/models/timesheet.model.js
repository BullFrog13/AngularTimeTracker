export default class Timesheet{
    constructor(timesheet){
        this.Id = timesheet.Id;
        this.Comment = timesheet.Comment;
        this.LoggedTime = timesheet.LoggedTime;
        this.TicketId = timesheet.TicketId;
        this.Date = timesheet.Date;
    }
}