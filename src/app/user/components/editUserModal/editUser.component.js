import template from './editUserModal.html';
import controller from './editUser.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};