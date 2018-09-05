export default class LoginService {
    constructor(Restangular, NotificationService, LocalStorage, EmployeeService) {
        this.Restangular = Restangular;
        this.LocalStorage = LocalStorage;
        this.EmployeeService = EmployeeService;

        this.CurrentUser = null;

        this.IsAuthenthicated = this.LocalStorage.getItem('User') === null ? false : true;
        this.NotificationService = NotificationService;
    }

    login(login) {
        this.Restangular.setBaseUrl('http://aac-vm.universe.dart.spb:8080/api/');
        const baseUrl = this.Restangular.all('employees/login')

        return baseUrl.post(login).then((loggedInUser) => {
            return this.EmployeeService.getEmployee(loggedInUser.Id).then((user) => {
                this.CurrentUser = user;

                this.IsAuthenthicated = true;
                this.NotificationService.emit('userLoggedIn', loggedInUser);
                this.LocalStorage.setJsonItem('User', loggedInUser);

                return user;
            });
        }, (errorResponse) => {
            this.IsAuthenthicated = false;
            if (errorResponse.status === 401) {
                return errorResponse.data.Message;
            }
        });
    }

    logout() {
        this.CurrentUser = null;
        this.IsAuthenthicated = false;

        this.LocalStorage.removeItem('User');

        this.NotificationService.emit('userLoggedOut');
    }

    getCurrentUser() {
        const user = this.LocalStorage.getItem('User');
        if (user) {
            return this.LocalStorage.getJsonItem('User');
        }

        return null;
    }

    getCurrentUserRoles() {
        return this.CurrentUserRoles;
    }

    currentUserIsInRole(roleName) {
        if (this.CurrentUser !== null) {
            for (let i = 0; i < this.CurrentUser.Roles.length; i++) {
                if (this.CurrentUser.Roles[i].Name === roleName) {
                    return true;
                }
            }
        }

        return false;
    }

    isAuthenticated() {
        return this.IsAuthenthicated;
    }
}