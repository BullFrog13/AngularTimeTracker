export default class Task {

    constructor(task) {
        this.Description = task.Description;
        this.EndDate = task.EndDate;
        this.Estimate = task.Estimate;
        this.Id = task.Id;
        this.Name = task.Name;
        this.Project = task.Project;
        this.ProjectId = task.ProjectId;
        this.Reporter = task.Reporter;
        this.ReporterId = task.ReporterId;
        this.Responsible = task.Responsible;
        this.ResponsibleId = task.ResponsibleId;
        this.StartDate = task.StartDate;
        this.Status = task.Status;
        this.StatusId = task.StatusId;
        this.TicketType = task.TicketType;
        this.TimeSheets = task.TimeSheets;
        this.TypeId = task.TypeId;
    }
}