export default class ProfileController {
    constructor(LoginService, NotificationService, LocationService, ProjectPositionService) {
        this.User = LoginService.getCurrentUser();
        this.User.Location = LocationService.getLocation(this.User.LocationId);
        this.User.Position = ProjectPositionService.getProjectPosition(this.User.PositionId)

        NotificationService.addListener('userLoggedIn', (user) => {
            this.User = user;
        });
    }
}