import Task from '../models/task.model';
import Project from '../models/project.model';

export default class ProjectService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getProjectTickets(projectId) {
        this.baseEmployees = this.Restangular.one('projects', projectId);

        return this.baseEmployees.getList('tickets').then((projectTickets) => {
            const tickets = [];

            projectTickets.forEach((projectTicket) => {
                const ticket = new Task(projectTicket);
                tickets.push(ticket);
            });

            return tickets;
        });
    }

    getProject(projectId) {
        return this.Restangular.one('projects', projectId).get().then((project) => {
            return new Project(project);
        });
    }

    editProject(project) {
        return this.Restangular.one('projects', project.Id).get().then((projectToUpdate) => {
            return projectToUpdate.customPUT(project).then((updatedProject) => {
                return new Project(updatedProject);
            });
        });
    }

    getAllProjects() {
        const baseProjects = this.Restangular.all('projects');

        return baseProjects.getList().then((projects) => {
            const projectsResult = [];

            projects.forEach((project) => {
                const newProject = new Project(project);
                projectsResult.push(newProject);
            });

            return projectsResult;
        });
    }
}