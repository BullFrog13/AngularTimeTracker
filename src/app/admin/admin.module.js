import angular from 'angular';

import AdminDashboard from './components/adminDashboard/adminDashboard.component';
import AdminEmployees from './components/adminEmployees/adminEmployees.component';
import AdminProjects from './components/adminProjects/adminProjects.component';

export default angular
    .module('app.admin', [])
    .component('adminDashboard', AdminDashboard)
    .component('adminEmployees', AdminEmployees)
    .component('adminProjects', AdminProjects);