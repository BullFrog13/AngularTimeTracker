// DEPENDENCIES
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import angularMessages from 'angular-messages';
import restangular from 'restangular';
import dragula from 'angularjs-dragula';

// CONFIGS
import routesConfig from './app.routes.config';
import httpInterceptorConfig from './app.httpInterceptor.config';
import authInterceptorConfig from './app.authInterceptor.config';
import httpConfig from './app.http.config';
import loginRedirectConfig from './app.loginRedirect.config';

// CUSTOM MODULES
import commonModule from './common/common.module';
import dashboardModule from './dashboard/dashboard.module';
import techsModule from './techs/techs.module';
import authModule from './auth/auth.module';
import mockDataServices from './mockDataServices/mockDataServices.module';
import profileModule from './profile/profile.module';
import projectModule from './project/project.module';
import userModule from './user/userPage.module';
import taskModule from './task/task.module';
import adminModule from './admin/admin.module';

// SERVICES
import NotificationService from './app.notification.service';
import LocalStorageService from './app.localstorage.service';

// DIRECTIVES
import CompareDirective from './app.compareDirective';

// FILTERS
import CompareDateFilter from './app.dateCompare.filter';

// MAIN COMPONENT
import main from './main/main.component'

//MODAL COMPONENT
import newTimesheetModal from './main/newTimesheet/newTimesheet.component';
import editTimesheetModal from './main/editTimesheet/editTimesheet.component';
import UnsavedChangesModal from './main/unsavedChangesModal/unsavedChanges.component';

// STYLES
import './app.scss';

angular
    .module('app', [
        // DEPENDENCIES
        uiRouter,
        uiBootstrap,
        angularMessages,
        restangular,
        dragula(angular),

        // CUSTOM MODULES
        dashboardModule.name,
        commonModule.name,
        techsModule.name,
        authModule.name,
        profileModule.name,
        mockDataServices.name,
        projectModule.name,
        userModule.name,
        taskModule.name,
        adminModule.name
    ])
    .config(routesConfig)
    .config(httpInterceptorConfig)
    .config(authInterceptorConfig)
    .config(httpConfig)
    .directive('compareTo', () => new CompareDirective())
    .filter('dateCompare', CompareDateFilter)
    .service('NotificationService', NotificationService)
    .service('LocalStorage', LocalStorageService)
    .component('main', main)
    .component('newTimesheetModal', newTimesheetModal)
    .component('editTimesheetModal', editTimesheetModal)
    .component('unsavedChangesModal', UnsavedChangesModal)
    .run(loginRedirectConfig);