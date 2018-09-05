export default routesConfig;

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            component: 'main'
        })
        .state('app.dashboard', {
            url: 'dashboard',
            component: 'dashboard'
        })
        .state('app.registration', {
            url: 'registration',
            component: 'registration'
        })
        .state('app.login', {
            url: 'login',
            component: 'login'
        })
        .state('app.admin', {
            url: 'admin',
            component: 'adminDashboard'
        })
        .state('app.admin.employees', {
            url: '/employees',
            component: 'adminEmployees'
        })
        .state('app.admin.projects', {
            url: '/projects',
            component: 'adminProjects'
        })
        .state('app.profile', {
            url: 'profile',
            component: 'profile'
        })
        .state('app.project', {
            url: 'project/{projectId}',
            component: 'project',
            resolve: {
                project: function(ProjectService, $transition$) {
                    return ProjectService.getProject($transition$.params().projectId);
                }
            }
        })
        .state('app.user', {
            url: 'user/{userId}',
            component: 'userPage',
            resolve: {
                user: function(EmployeeService, $transition$) {
                    return EmployeeService.getEmployee($transition$.params().userId);
                }
            }
        })
        .state('app.task', {
            url: 'task/{taskId}',
            component: 'task',
            resolve: {
                task: function(TaskService, $transition$) {
                    return TaskService.getTask($transition$.params().taskId);
                }
            }
        })
        .state('404', {
            templateUrl: 'errorPages/404.html'
        });
}