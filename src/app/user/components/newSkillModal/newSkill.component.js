import template from './newSkillModal.html';
import controller from './newSkill.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};