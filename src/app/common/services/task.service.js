import Task from '../models/task.model';
import Timesheet from '../models/timesheet.model';

export default class TaskService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getTaskTimesheets(taskId) {
        const taskResource = this.Restangular.one('tasks', taskId);

        return taskResource.getList('timesheets').then((taskTimesheets) => {
            const timesheets = [];

            taskTimesheets.forEach((timesheet) => {
                const newTimesheet = new Timesheet(timesheet);
                timesheets.push(newTimesheet);
            });

            return timesheets;
        });
    }

    updateTaskStatus(taskId, statusId) {
        return this.Restangular.one('tasks', taskId).get().then((taskToUpdate) => {
            taskToUpdate.StatusId = statusId;
            return taskToUpdate.put().then((ticket) => {
                return ticket;
            });
        });
    }

    updateTask(task) {
        return this.Restangular.one('tasks', task.Id).get().then((taskToUpdate) => {
            return taskToUpdate.customPUT(task).then((updatedTask) => {
                return new Task(updatedTask);
            });
        });
    }

    deleteTask(taskId) {
        return this.Restangular.one('tasks', taskId).get().then((task) => {
            return task.customDELETE(taskId).then((result) => {
                return result;
            });
        });
    }

    createTask(task) {
        const base = this.Restangular.all('tasks');

        return base.post(task).then((createdTask) => {
            return new Task(createdTask);
        });
    }

    searchTask(responisbleId, projectId) {
        const tasksBase = this.Restangular.all('tasks');

        return tasksBase.customGET('search', { 'taskSearch.responsibleId': responisbleId, 'taskSearch.projectId': projectId }).then((filteredTasks) => {
            const tasks = [];

            filteredTasks.forEach((filteredTask) => {
                const task = new Task(filteredTask);
                tasks.push(task);
            });

            return tasks;
        });
    }

    getTask(taskId) {
        return this.Restangular.one('tasks', taskId).get().then((task) => {
            return new Task(task);
        });
    }
}