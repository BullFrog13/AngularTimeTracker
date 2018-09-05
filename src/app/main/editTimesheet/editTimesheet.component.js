import template from './editTimesheetModal.html';
import controller from './editTimesheet.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};