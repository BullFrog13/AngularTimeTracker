import angular from 'angular';

import footer from './components/footer/footer.component';
import navbar from './components/navbar/navbar.component';

// MODELS
import Employee from './models/employee.model';
import Project from './models/project.model';
import Task from './models/task.model';
import Timesheet from './models/timesheet.model';
import Skill from './models/skill.model';

// SERVICES
import EmployeeService from './services/employee.service';
import ProjectService from './services/project.service';
import TaskService from './services/task.service';
import TimesheetService from './services/timesheet.service';
import TeamService from './services/team.service';
import SkillService from './services/skill.service';

export default angular
    .module('app.common', [])
    .factory('Employee', Employee)
    .factory('Project', Project)
    .factory('Task', Task)
    .factory('Timesheet', Timesheet)
    .factory('Skill', Skill)
    .service('EmployeeService', EmployeeService)
    .service('ProjectService', ProjectService)
    .service('TaskService', TaskService)
    .service('TimesheetService', TimesheetService)
    .service('TeamService', TeamService)
    .service('SkillService', SkillService)
    .component('myFooter', footer)
    .component('navbar', navbar);