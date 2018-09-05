export default class RegistrationCtrl {

    constructor(RegistrationService, LocationService, ProjectPositionService, EmployeeService) {

        this.locations = [];
        this.positions = [];
        this.employees = [];

        this.EmployeeService = EmployeeService;

        this.locations = LocationService.getLocations();
        this.positions = ProjectPositionService.getProjectPositions();
    }

    register(employee) {
        this.EmployeeService.createEmployee(employee);
    }
}