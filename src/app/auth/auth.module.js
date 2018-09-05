import angular from 'angular';

// COMPONENTS
import Login from './components/login/login.component';
import Registration from './components/registration/registration.component'

// SERVICES
import LoginService from './services/login.service';
import RegistrationService from './services/registration.service';

// MODELS
import LoginModel from './models/login.model';

export default angular
    .module('app.auth', [])
    .component('login', Login)
    .component('registration', Registration)
    .service('LoginService', LoginService)
    .service('RegistrationService', RegistrationService)
    .factory('Login', LoginModel);