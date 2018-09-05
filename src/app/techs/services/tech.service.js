export default class TechService {
    constructor($http) {
        this.$http = $http;
    }

    getList() {
        return this.$http.get('assets/mockData/techs.json').then(({ data }) => data);
    }
}