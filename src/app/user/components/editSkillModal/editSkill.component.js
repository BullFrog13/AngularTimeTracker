import template from './editSkillModal.html';
import controller from './editSkill.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};