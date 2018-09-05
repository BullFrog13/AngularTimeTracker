import template from './editTaskModal.html';
import controller from './editTask.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};