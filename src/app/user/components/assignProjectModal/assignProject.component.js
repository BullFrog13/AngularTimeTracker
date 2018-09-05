import template from './assignProjectModal.html';
import controller from './assignProject.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};