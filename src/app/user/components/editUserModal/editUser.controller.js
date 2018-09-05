export default class EditUserModalController {
    constructor(EmployeeService, LocationService) {
        this.birthdayOpen = false;
        this.locations = [];

        this.LocationService = LocationService;
        this.EmployeeService = EmployeeService;
    }

    $onInit() {
        this.user = this.resolve.user;
        this.locations = this.LocationService.getLocations()

        this.locations.forEach((location) => {
            if (location.Id === this.user.LocationId) {
                this.user.Location = location;
            }
        });

        this.user.Birthday = new Date(this.user.Birthday);
    }

    openBirthdayDatePicker() {
        this.birthdayOpen = true;
    }

    editUser() {
        this.user.LocationId = this.user.Location.Id;

        for (let i = 0; i < this.user.Projects.length; i++) {
            this.user.Projects[i] = this.user.Projects[i].Id;
        }

        this.EmployeeService.editEmployee(this.user).then((updatedUser) => {
            this.close({ $value: updatedUser });
        });
    }
}