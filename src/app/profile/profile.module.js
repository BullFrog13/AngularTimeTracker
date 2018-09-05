import angular from 'angular';

import Profile from './components/profile/profile.component';


export default angular
    .module('app.profile', [])
    .component('profile', Profile);