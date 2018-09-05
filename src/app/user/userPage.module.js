import angular from 'angular';

import UserPage from './components/userPage/userPage.component';
import EditSkillModal from './components/editSkillModal/editSkill.component';
import EditUserModal from './components/editUserModal/editUser.component';
import NewSkillModal from './components/newSkillModal/newSkill.component';
import AssignProjectModal from './components/assignProjectModal/assignProject.component';

export default angular
    .module('app.user', [])
    .component('userPage', UserPage)
    .component('editSkill', EditSkillModal)
    .component('editUser', EditUserModal)
    .component('newSkill', NewSkillModal)
    .component('assignProject', AssignProjectModal);