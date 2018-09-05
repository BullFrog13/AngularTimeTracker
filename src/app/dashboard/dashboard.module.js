import angular from 'angular';

import dashboard from './components/dashboard/dashboard.component';
import createTaskModal from './components/createTaskModal/createTask.component';
import editTaskModal from './components/editTaskModal/editTask.component';

export default angular
    .module('app.dashboard', [])
    .component('dashboard', dashboard)
    .component('createTask', createTaskModal)
    .component('editTask', editTaskModal);