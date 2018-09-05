export default class LoginCtrl {
    constructor(LoginService, NotificationService, $state) {
        this.LoginService = LoginService;
        this.NotificationService = NotificationService;
        this.InvalidLogin = false;
        this.ErrorMessage = '';

        this.$state = $state;
    }

    login(login) {
        this.LoginService.login(login).then(() => {
            this.$state.transitionTo('app');
        }, (reason) => {
            this.ErrorMessage = reason;
            this.InvalidLogin = true;
        });
    }
}