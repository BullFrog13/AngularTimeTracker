import './userPage.scss';
import template from './userPage.html';
import controller from './userPage.controller';

export default {
    template,
    controller,
    bindings: { user: '<' }
};