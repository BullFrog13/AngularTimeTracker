import angular from 'angular';

import Task from './components/task/task.component';

export default angular
    .module('app.task', [])
    .component('task', Task);