import angular from 'angular';

import Project from './components/project/project.component';
import AddMemberModal from './components/addMemberModal/addMember.component';
import EditProjectModal from './components/editProjectModal/editProject.component';

export default angular
    .module('app.project', [])
    .component('project', Project)
    .component('addMember', AddMemberModal)
    .component('editProject', EditProjectModal);