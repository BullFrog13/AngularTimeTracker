export default class NavbarController {
    constructor(NotificationService, LoginService, $state) {
        this.LoginService = LoginService;
        this.NotificationService = NotificationService;
        this.$state = $state;

        this.isAuthenticated = this.LoginService.isAuthenticated();
        this.userIsAdministrator = false;

        if (this.isAuthenticated) {
            this.userIsAdministrator = this.LoginService.currentUserIsInRole('Admin');
        }

        this.NotificationService.addListener('userLoggedIn', () => {
            this.isAuthenticated = true;
            this.userIsAdministrator = this.LoginService.currentUserIsInRole('Admin');
        });
    }

    logout() {
        this.isAuthenticated = false;
        this.userIsAdministrator = false;

        this.LoginService.logout();

        this.$state.transitionTo('app.login');
    }
}