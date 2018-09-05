import './task.scss';
import template from './task.html';
import controller from './task.controller';

export default {
    template,
    controller,
    bindings: { task: '<' }
};