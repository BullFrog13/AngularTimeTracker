export default ($transitions, LoginService) => {
    $transitions.onStart({}, (transition) => {
        let destinatonStateName = transition.$to().name;
        let loggedIn = LoginService.isAuthenticated();

        if (!loggedIn && destinatonStateName !== 'app.login' && destinatonStateName !== 'app.registration') {
            transition.router.stateService.transitionTo('app.login');
        }
    });
}