export default class RegistrationService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    register(employee) {
        const baseEmployees = this.Restangular.all('employees');

        baseEmployees.post(employee);
    }
}