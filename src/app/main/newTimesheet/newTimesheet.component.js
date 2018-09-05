import template from './newTimesheetModal.html';
import controller from './newTimesheet.controller';

export default {
    template,
    controller,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};