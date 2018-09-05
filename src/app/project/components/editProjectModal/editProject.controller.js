export default class EditProjectModalController {
    constructor(ProjectService) {
        this.ProjectService = ProjectService;

        this.startDateOpened = false;
        this.endDateOpened = false;
    }

    $onInit() {
        this.project = this.resolve.project;
        this.project.StartDate = new Date(this.project.StartDate);
        this.project.EndDate = new Date(this.project.EndDate);
    }

    editProject() {
        this.ProjectService.editProject(this.project).then((editedProject) => {
            this.close({ $value: editedProject });
        })
    }

    openStartDate() {
        this.startDateOpened = true;
    }

    openEndDate() {
        this.endDateOpened = true;
    }
}