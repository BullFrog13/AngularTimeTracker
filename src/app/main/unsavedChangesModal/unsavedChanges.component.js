import template from './unsavedChangesModal.html';
import controller from './unsavedChanges.controller';

export default {
    template,
    controller,
    bindings: {
        close: '&',
        dismiss: '&'
    }
};