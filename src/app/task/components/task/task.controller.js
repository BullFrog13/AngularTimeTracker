export default class TaskController {
    constructor(ProjectService) {
        this.ProjectService = ProjectService;

        this.project = {};
    }

    $onInit() {
        this.ProjectService.getProject(this.task.ProjectId).then((project) => {
            this.project = project;
        });
    }
}